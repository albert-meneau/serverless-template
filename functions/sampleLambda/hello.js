'use strict';

const sampleService = require('../lib/sampleService');

module.exports.run = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  sampleService.hello(event, callback);
};

