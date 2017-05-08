'use strict';

const expect = require('chai').expect;

const conf      = require('../config/config');
const premieres = require('../functions/sampleLambda/index').run;
const utils     = require('@vevo/node-aws-test');

describe('Top Videos', () => {
  describe('handler returns successfully', () => {
    utils.verifyHandlerSucceeds(premieres, {}, result => {
      expect(result).to.not.be.null;
    });
  });
});