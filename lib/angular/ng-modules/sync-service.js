'use strict';

var config = require('../../config')
  , _ = require('lodash')
  ;

module.exports = 'wfm.workorder.sync';

function removeLocalVars(object) {
  _.keys(object).filter(function(key) {
    return key.indexOf('_') === 0;
  }).forEach(function(localKey) {
    delete object[localKey];
  });
  if (object.results) {
    _.values(object.results).forEach(function(result) {
      _.keys(result.submission).filter(function(key) {
        return key.indexOf('_') === 0;
      }).forEach(function(localKey) {
        delete result.submission[localKey];
      });
    });
  };
};

function wrapManager($q, $timeout, manager) {
  var wrappedManager = {
    create: function(workorder) {
      removeLocalVars(workorder);
      return manager.create(workorder);
    }
  , read: manager.read
  , update: function(workorder) {
      var args = arguments;
      removeLocalVars(workorder);
      return manager.update(workorder);
    }
  , delete: manager.delete
  , list: manager.list
  , new: function() {
      var deferred = $q.defer();
      $timeout(function() {
        var workorder = {
          type: 'Job Order'
        , status: 'New'
        };
        $q.resolve(workorder);
      }, 0);
      return deferred.promise;
    }
  };
  return wrappedManager;
}

angular.module('wfm.workorder.sync', [require('fh-wfm-sync')])
.factory('workorderSync', function($q, $timeout, syncService) {
  syncService.init($fh, config.syncOptions);
  var workorderSync = {};
  workorderSync.managerPromise = syncService.manage(config.datasetId)
  .then(function(manager) {
    workorderSync.manager = wrapManager($q, $timeout, manager);
    console.log('Sync is managing dataset:', config.datasetId);
    return workorderSync.manager;
  });
  return workorderSync;
})
;
