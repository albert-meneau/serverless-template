'use strict'

const expect  = require('chai').expect;
const appInfo = require('../package.json');
const conf    = require('../config/config');

module.exports = {
  clientId:     process.env.TEST_CLIENT_ID,     // sample env variab;es
  clientSecret: process.env.TEST_CLIENT_SECRET,
  conf:         conf,
  environment:  process.env.NODE_ENV,
  context:      createContext 
};

function createContext(callback) {
  return {
      succeed: function(result) {
        expect(result.valid).to.be.true;

        callback();
      },
      fail: function() {
        callback(new Error( 'There was an error' ));
      }
  };
}