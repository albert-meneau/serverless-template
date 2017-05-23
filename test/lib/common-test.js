'use strict';

describe('[Lib - Common]', () => {

  const expect = require('chai').expect;

  it('creates object successfully', (done) => {
    const COMMON = require('../../functions/lib/common').create('tests');

    expect(COMMON.configuration).to.not.be.null;
    expect(COMMON.auth).to.not.be.null;
    expect(COMMON.nfs).to.not.be.null;
    expect(COMMON.nfs.logger).to.not.be.null;
    expect(COMMON.processCall).to.not.be.null;

    done();
  });

});
