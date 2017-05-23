'use strict';

module.exports = {
  hello: hello
};

const common = require('./common').create('sampleLambda');

function hello(event, callback) {
  return common.processCall(event, callback, 'sampleService-hello', ['administrator'], () => {
    let response = {
      message: 'Hello',
      to:      'Mr. Roboto',
      from:    'Fam'
    };

    return new Promise((resolve, reject) => {  // eslint-disable-line
      return resolve({ statusCode: 200, body: JSON.stringify(response)});
    });
  });
}

/* NOTE: Below is a sample of doing service calls and returning responses
function getAll(event, context, callback) {
  return common.processCall(event, callback, 'locales-get-all', ['administrator'], () => {
    return common.service.locale.getAll()
      .then((locales) => {
        return Promise.resolve({ statusCode: 200, body: JSON.stringify(locales)});
      });
  });
}

function get(event, context, callback) {
  return common.processCall(event, callback, 'locales-get-by-name', ['administrator'], () => {
    return common.service.locale.get(event.params['name'])
      .then((locale)  => Promise.resolve({ statusCode: 200, body: JSON.stringify(locale)}));
  });
}

function upsert(event, context, callback) {
  return common.processCall(event, callback, 'locales-upsert', ['administrator'], () => {
    return common.service.locale.upsert(event.body, event.body.name)
      .then(() => Promise.resolve({ statusCode: 204 }));
  });
}

function deleteLocale(event, context, callback) {
  return common.processCall(event, callback, 'locales-delete', ['administrator'], () => {
    return common.service.locale.delete(event.params['name'])
      .then(()  => Promise.resolve({ statusCode: 204 }));
  });
}
*/