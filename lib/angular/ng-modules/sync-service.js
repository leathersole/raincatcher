'use strict';

var config = require('../../config')
  , _ = require('lodash')
  ;

module.exports = 'wfm.result.sync';

function removeLocalVars(result) {
  _.keys(result).filter(function(key) {
    return key.indexOf('_') === 0;
  }).forEach(function(localKey) {
    delete result[localKey];
  });
  if (result.submission) {
    _.keys(result.submission).filter(function(key) {
      return key.indexOf('_') === 0;
    }).forEach(function(localKey) {
      delete result.submission[localKey];
    });
  };
};

function wrapManager($q, $timeout, manager) {
  var wrappedManager = {
    create: function(result) {
      removeLocalVars(result);
      return manager.create(result);
    }
  , read: manager.read
  , update: function(result) {
      var args = arguments;
      removeLocalVars(result);
      return manager.update(result);
    }
  , delete: manager.delete
  , list: manager.list
  , filter: function(resultsArray, workorderId) {
      var results = {};
      resultsArray.filter(function(result) {
        return String(result.workorderId) === String(workorderId);
      }).forEach(function(result) {
        // clobber "older" results
        if (!results[result.step.code] || (results[result.step.code] && results[result.step.code].timestamp < result.timestamp)) {
          results[result.step.code] = result;
        }
      });
      return results;
    }
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
;
