"use strict";

const
  expect = require('chai').expect,
  conf = require('../config/config'),
  myFunction = require('../functions/lib/lib.js').handle;

describe('your-service-name tests', () => {

  it('should return status code 200', (done) => {
    myFunction({}, {}, (error, response) => {
      expect(error).to.deep.equal(null);
      expect(response.statusCode).to.exist;
      expect(response.statusCode).to.eql(200);
      done();
    })
  });

  it('should have the correct config value', (done) => {
    var value = conf.get('someCategory.anotherConfigKey');
    expect(value).to.eql(12345);
    done();
  });
});