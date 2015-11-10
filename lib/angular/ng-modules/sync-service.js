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
  var manager = {};
  syncService.init($fh, config.syncOptions);
  syncService.manage(config.datasetId).then(function(sync) {
    manager = sync.manager;
    console.log('Sync is managing dataset:', config.datasetId);
  });
  var workorderSync = {
    create: function(workorder) {
      workorder = removeLocalVars(workorder);
      return manager.create(workorder);
    }
  , read: manager.read
  , update: function(workorder) {
      removeLocalVars(workorder);
      return manager.update(workorder);
    }
  , delete: manager.delete
  , list: manager.list
  };
  return workorderSync;
})
;
