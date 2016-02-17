/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var config = require('../../config')
  , _ = require('lodash')
  ;

module.exports = 'wfm.result.sync';

function wrapManager($q, $timeout, manager) {
  var wrappedManager = _.create(manager);
  wrappedManager.filter = function(resultsArray, workorderId) {
    var deferred = $q.defer();
    var results = {};
    resultsArray.filter(function(result) {
      return String(result.workorderId) === String(workorderId);
    }).forEach(function(result) {
      // clobber "older" results
      if (!results[result.step.code] || (results[result.step.code] && results[result.step.code].timestamp < result.timestamp)) {
        results[result.step.code] = result;
      }
    });
    deferred.resolve(results);
    return deferred.promise;
  };
  return wrappedManager;
}

angular.module('wfm.result.sync', [require('fh-wfm-sync')])
.factory('resultSync', function($q, $timeout, syncService) {
  syncService.init($fh, config.syncOptions);
  var resultSync = {};
  resultSync.managerPromise = syncService.manage(config.datasetId)
  .then(function(manager) {
    resultSync.manager = wrapManager($q, $timeout, manager);
    console.log('Sync is managing dataset:', config.datasetId);
    return resultSync.manager;
  });
  return resultSync;
})

.filter('isEmpty', function () {
  return function (object) {
    return (Object.keys(object).length === 0);
  };
});
;
