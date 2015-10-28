'use strict';

var mediator = require('./mediator');

angular.module('wfm.core.mediator', ['ng'])

.factory('mediator', function mediatorService($q, $log) {
  var originalRequest = mediator.request;

  // monkey patch the request function, wrapping the returned promise as an angular promise
  mediator.request = function() {
    var promise = originalRequest.apply(mediator, arguments);
    return $q.when(promise);
  };

  return mediator;
});

module.exports = 'wfm.core.mediator';
