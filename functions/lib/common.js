// NOTE: This handles the creation of the the lambda service.  Also has the common function of processing a handler
// - processing nfs endpoints and authenticating
'use strict';

module.exports = {
  create: create
};

function create(name) {

  const CONF   = require('../../config/config');
  const NFS    = require('@vevo/nfs-lambda');
  const AUTH   = require('@vevo/node-auth');
  const API    = require('./api');
  let   appNFS = null;


  if (!appNFS) {
    appNFS = createNFS();

    appNFS.logger.info('Module Initialized');
  }

  // NOTE: You can create your services here 
  //const SERVICE   = require('@vevo/cs-reference').create(appNFS.logger);

  return {
    configuration: CONF,
    //service:       SERVICE, // reference to your service
    auth:          AUTH,
    nfs:           appNFS,
    processCall:   processCall
  };

  function createNFS() {
    return NFS.create(
      {
        name:     `${CONF.get('service.name')}-${name}`,
        version:  CONF.get('service.version'),
      },
      {
        logLevel: CONF.get('service.logLevel'),
      }
    );
  }

  function processCall(event, callback, functionName, functionRoles, functionToExecute) {
    let res       = API.handle(functionName, event, appNFS.logger);
    let startTime = Date.now();
    
    if (res) {
      return callback(null, res);
    }
    
    appNFS.logger.info('Authenticating...');

    return AUTH.authenticate(event, functionRoles)
      .then(()     => functionToExecute(event, callback))
      .then((result) => { 
        // if you want to record metrics
        recordMetric(`${functionToExecute} latency`, Date.now() - startTime, 'Milliseconds');

        callback(null, result);

        return Promise.resolve();
      })
      .catch((err) => {
        if (err && err.length > 0) {
          callback({ statusCode: err[0].statusCode, body: JSON.stringify(err) });

          return Promise.resolve();
        }
        else {
          appNFS.logger.error(JSON.stringify(err));

          callback({ statusCode: 400, body: JSON.stringify(err) });

          return Promise.resolve();
        }
      });
  }

  function recordMetric(name, value, unit) {
    if (appNFS.metrics) {
      //Record a cloudwatch metric. (Fire & Forget)
      //This can later be shown in a DataDog dashboard!
      appNFS.metrics.record([{
        MetricName: name,
        Value:      value,
        Unit:       unit
      }], 
      (err) => {
        if (err) {
          appNFS.logger.error('Could not send metric to cloud watch:', err);
        }
      });
    }
  }
}
