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

var convict = require('convict'),
  yaml = require('js-yaml'),
  fs = require('fs');

var conf = convict({
  stage: {
    doc: 'The service stage (environment)',
    format: ['dev', 'prod', 'test'],
    default: 'dev',
    env: 'DEPLOY_STAGE'
  },

  tokenClientId: {
    doc: 'Client Id for auth token (should be an env var)',
    format: String,
    default: '',
    env: 'TOKEN_CLIENT_ID'
  },

  tokenClientSecret: {
    doc: 'Client Secret for auth token (should be an env var)',
    format: String,
    default: '',
    env: 'TOKEN_CLIENT_SECRET'
  },

  sampleEndpoint: {
    doc: 'sample endpoint',
    default: 'https://apiv2.vevo.com/oauth/token/',
    format: 'url'
  },

  someCategory: {
    someConfigKey: {
      doc: 'some config key description',
      default: '',
      format: String
    },
    anotherConfigKey: {
      doc: 'description',
      default: 1234,
      format: 'int'
    }
  }

});

var stage = conf.get('stage');

//read yaml files, convert them to JSON and merge them into our config object
try {
  conf.load(yaml.safeLoad(fs.readFileSync(__dirname + '/common.yml', 'utf8'))); //common
  conf.load(yaml.safeLoad(fs.readFileSync(__dirname + '/' + stage + '.yml', 'utf8'))); //stage specific
  conf.validate({strict: true});
} catch (e) {
  console.error(e);  //yaml errors
}

module.exports = conf;