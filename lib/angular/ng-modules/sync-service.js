'use strict';

var config = require('../../config')

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

angular.module('wfm.workorder.sync', ['wfm.core.mediator', require('fh-wfm-sync')])
.run(function(syncService, mediator) {
  syncService.init($fh, mediator, config.syncOptions);
  syncService.manage(config.datasetId).then(function() {
    console.log('Sync is managing dataset:', config.datasetId);
  });
})
.factory('workorderSync', function($q, syncService) {
  workorderSync = {
    init: syncService.init
  , manage: syncService.manage
  , create: function(workorder) {
      workorder = removeLocalVars(workorder);
      syncService.create(workorder);
    }
  , read: syncService.read
  , update: function(workorder) {
      workorder = removeLocalVars(workorder);
      syncService.update(workorder);
    }
  , delete: syncService.delete
  , list: syncService.list
  };
  return workorderSync;
})
;
