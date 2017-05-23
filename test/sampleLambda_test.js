'use strict';

require('dotenv').config({silent: true});

const expect      = require('chai').expect;
const vevoToken   = require('@vevo/node-token-legacy');
const TEST_HELPER = require('./test_helper');
let TOKEN_TO_USE  = null;

describe('[Sample Lambda]', () => {

  describe('[GET - By UrlSafeName]', () => {
    const FUNC    = require('../functions/sampleLambda/hello').run;

    before((done) => {
      vevoToken.create(TEST_HELPER.clientId, TEST_HELPER.clientSecret, 'US')
        .then((newToken) => {
          TOKEN_TO_USE = newToken;

          done();
        })
        .catch((err) => done(err));
    });
    
    it('can return up successfully', (done) => {
      FUNC({ params: { operation: 'up'} }, TEST_HELPER.context(done), (err, res) => {
        try {
          expect(res).to.not.be.null;

          done();
        }
        catch(err) {
          done(err);
        }
      });
    });

    it('can return ready successfully', (done) => {
      FUNC({ params: { operation: 'ready'} }, TEST_HELPER.context(done), (err, res) => {
        try {
          expect(res).to.not.be.null;

          done();
        }
        catch(err) {
          done(err);
        }
      });
    });

    it('can handle successfully', (done) => {
      FUNC({ token: TOKEN_TO_USE }, TEST_HELPER.context(done), (err, res) => {
        try {
          expect(res).to.not.be.null;
          expect(res.statusCode).to.eql(200);
          expect(res.body).to.not.be.null;
          
          done();
        }
        catch(err) {
          done(err);
        }
      });
    });

    it('returns invalid token error', (done) => {
      FUNC({ token: '_TMw_fGgJHvzr84MqwK1eWhBgbdebZhAm_y3W1ou-sU1.1472767200.x3WU2dUJ6XSR90VcTqAedv024ayH3uShXZOXJ2Kz6-VxHnKM3BvorkNIrwSKMpMQhQ_ijw2'  }, TEST_HELPER.context(done), (err, res) => {
        try {
          expect(err).to.not.be.null;
          expect(err.statusCode).to.eql(401);
          expect(err.body.length).to.be.above(0);

          done();
        }
        catch(err) {
          done(err);
        }
      });
    });
    
  });

});