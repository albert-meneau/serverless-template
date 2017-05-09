'use strict';

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