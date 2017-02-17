'use strict';

//your code goes in this file...

var
  conf = require('../../config/config'),
  Nfs = require('@vevo/nfs-lambda'), nfs = null,

  //CONFIG
  SOME_CONFIG_KEY = conf.get('someCategory.someConfigKey'),
  ANOTHER_CONFIG_KEY = conf.get('someCategory.anotherConfigKey'),
  SAMPLE_ENDPOINT = conf.get('sampleEndpoint');

module.exports.handle = (event, context, cb) => {

  //don't wait for cloudwatch (or any other) callback if it takes longer than expected (fire & forget)
  context.callbackWaitsForEmptyEventLoop = false;

  //singleton NFS
  if (!nfs) nfs = Nfs.create({name: 'my-service-name', version: '1.0.0'});
  nfs.logger.info('Started my-service-name...', SAMPLE_ENDPOINT, "Unique Tracking ID:", context.awsRequestId);


  //404 response
  if (!SOME_CONFIG_KEY || !ANOTHER_CONFIG_KEY) {
    nfs.logger.error('Error! missing config values');
    return cb(null, {
      statusCode: 404,
      body: JSON.stringify({message: 'Not found!'}), //you may use vevo-errors for the body: https://github.com/VEVO/error-helper
    });
  }

  //200 response
  var startTime = Date.now();

  const body = {
    message: 'Testing ' + ANOTHER_CONFIG_KEY,
    input: event,
  };
  const response = {
    statusCode: 200,
    headers: {
      'custom-header': 'Custom header value',
    },
    body: JSON.stringify(body),
  };

  //Record a cloudwatch metric. (Fire & Forget)
  //This can later be shown in a DataDog dashboard!
  nfs.metrics.record([{
    MetricName: 'some-latency',
    Value: Date.now() - startTime,
    Unit: 'Milliseconds'
  }], function (err) {
    if (err) nfs.logger.error('Could not send metric to cloud watch:', err);
  });

  return cb(null, response);
};


//*** local runs ***
//module.exports.handle({}, {}, (err, res)=> {nfs.logger.info(">>> res:", err, res);});