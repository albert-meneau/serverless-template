'use strict';

var lib = require('../lib/lib');

module.exports.run = (event, context, callback) => {
  lib.handle(event, context, callback);
};
