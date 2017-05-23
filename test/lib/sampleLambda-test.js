'use strict';

describe('[Lib - Sample Lambda]', () => {

  const expect       = require('chai').expect;
  const SERVICE      = require('../../functions/lib/sampleService');
  const vevoToken    = require('@vevo/node-token-legacy');
  const TEST_HELPER  = require('../test_helper');
  let   TOKEN_TO_USE = null;

  before((done) => {
    vevoToken.create(TEST_HELPER.clientId, TEST_HELPER.clientSecret, 'US')
      .then((newToken) => {
        TOKEN_TO_USE = newToken;

        done();
      })
      .catch((err) => done(err));
  });

  it('can say hello successfully', (done) => {
    SERVICE.hello({ token: TOKEN_TO_USE }, (err, res) => {
      if (err) { 
        done(err);
      }

      expect(res.body).to.not.be.null;

      let message = JSON.parse(res.body);  

      expect(message.message).to.not.be.null;

      done();
    });
  });

});
