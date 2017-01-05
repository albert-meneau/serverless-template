'use strict';

var lib = require('./lib/lib');

module.exports.handle = (event, context, callback) => {
  lib.handle(event, context, callback);
};
