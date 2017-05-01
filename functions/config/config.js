'use strict';

/**
 * Main configuration schema
 * This defines what config values we have, what their type is and where to get them.
 * if an config value comes from environment variables (i.e. `env` value is set),
 * the definition must be added to the lambda env variables defined in to serverless.yml (under `environment`)
 *
 * We should have different .yml files for different stages. e.g. dev.yml, prod.yml
 * common.yml contains common configuration for all stages
 *
 * In case we want to use a config value in serverless.yml (e.g. a dynamodb table name), we can still define it here
 * like other values and refer to it like: ${file(./config/${env:DEPLOY_STAGE}.yml):myDynamoDbTableName}
 *
 * @type {convict}
 */

const convict = require('convict');
const yaml    = require('js-yaml');
const fs      = require('fs');
const conf    = convict({
  env: {
    doc:     'environment process is running in.',
    format:  ['production', 'staging', 'development'],
    default: 'development',
    env:     'NODE_ENV',
  },
  shortEnv: {
    doc:     'short name for the environment',
    format:  ['prd', 'stg', 'dev'],
    default: 'dev',
    env:     'ENV_SHORTNAME',
  },

  service: {
    name: {
      doc:     'service friendly name',
      format:  String,
      default: 'my-service-name',
    },
    version: {
      doc:     'service version',
      format:  String,
      default: pkg.version,
    },
    logLevel: {
      doc:     'Logging level, see: https://github.com/winstonjs/winston#logging-levels',
      format:  String,
      default: 'debug',
    },
  },

  vevo: {
    auth: {
      baseUrl: {
        doc:     'vevo auth url (conrad). ref: http://scribe.vevo.com/conrad/auth-flow',
        format:  String,
        default: 'https://apiv2.vevo.com',
        env:     'VEVO_AUTH_SERVICE',
      },

      clientKey: {
        doc:     'vevo api client key',
        format:  String,
        default: '',
        env:     'VEVO_IDENTITY_SERVICE_KEY',
      },
      clientSecret: {
        doc:     'vevo api client key',
        format:  String,
        default: '',
        env:     'VEVO_IDENTITY_SERVICE_SECRET',
      },
    },
    client: {
      baseUrl: {
        doc:     'vevo auth url (conrad). ref: http://scribe.vevo.com/conrad/auth-flow',
        format:  String,
        default: 'https://apiv2.vevo.com/',
        env:     'VEVO_CLIENT_HOST',
      },
    },
  }

});

var stage = conf.get('shortEnv');

//read yaml files, convert them to JSON and merge them into our config object
try {
  conf.load(yaml.safeLoad(fs.readFileSync(__dirname + '/common.yml', 'utf8')) || {}); //common
  conf.load(yaml.safeLoad(fs.readFileSync(__dirname + '/' + stage + '.yml', 'utf8')) || {}); //stage specific
  conf.validate({strict: true});
} catch (e) {
  console.error(e);  //yaml errors
}

module.exports = conf;