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
  if (object.steps) {
    _.values(object.steps).forEach(function(step) {
      _.keys(step.submission).filter(function(key) {
        return key.indexOf('_') === 0;
      }).forEach(function(localKey) {
        delete step.submission[localKey];
      });
    });
  };
};

angular.module('wfm.workorder.sync', [require('fh-wfm-sync')])
.factory('workorderSync', function($q, syncService) {
  syncService.init($fh, config.syncOptions);
  var managerPromise = syncService.manage(config.datasetId).then(function(sync) {
    // manager = sync.manager;
    console.log('Sync is managing dataset:', config.datasetId);
    return sync.manager;
  });
  var workorderSync = {
    create: function(workorder) {
      workorder = removeLocalVars(workorder);
      return managerPromise.then(function(manager) {
        return manager.create(workorder)
      });
    }
  , read: function() {
      var args = arguments;
      return managerPromise.then(function(manager) {
        return manager.read.apply(manager, args);
      })
    }
  , update: function(workorder) {
      var args = arguments;
      removeLocalVars(workorder);
      return managerPromise.then(function(manager) {
        return manager.update.apply(manager, args);
      });
    }
  , delete: function(workorder) {
      var args = arguments;
      return managerPromise.then(function(manager) {
        manager.delete.apply(manager, args);
      })
    }
  , list: function(workorder) {
      var args = arguments;
      return managerPromise.then(function(manager) {
        return manager.list.apply(manager, args);
      })
    }
  };
  console.log(workorderSync);
  return workorderSync;
})
;
