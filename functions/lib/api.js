// NOTE: This will handle the nfs checks for /up and /ready.  Maybe others as well
'use strict';

module.exports.handle = (functionName, event, logger) => {
  const parameters = event.params || {};
  const operation  = parameters.operation ? parameters.operation.toLowerCase(): '';
  let result       = { 
    function: functionName, 
    status:   'up'
  };

  if (operation === 'up') {
    logger.info(result);

    return { statusCode: 204, body: JSON.stringify('OK') };
  }

  if (operation === 'ready') {
    result.status = 'ready';

    logger.info(result);
    // TODO: Calls underlying assets
    return { statusCode: 200, body: JSON.stringify('Ready') };
  }

  // health

  return null;
};