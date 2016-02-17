/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var config = require('../../config')
  , _ = require('lodash')
  ;

module.exports = 'wfm.workorder.sync';

function wrapManager($q, $timeout, manager) {
  var wrappedManager = _.create(manager);
  wrappedManager.new = function() {
    var deferred = $q.defer();
    $timeout(function() {
      var workorder = {
        type: 'Job Order'
      , status: 'New'
      };
      deferred.resolve(workorder);
    }, 0);
    return deferred.promise;
  };

  return wrappedManager;
}

angular.module('wfm.workorder.sync', [require('fh-wfm-sync')])
.factory('workorderSync', function($q, $timeout, syncService) {
  syncService.init($fh, config.syncOptions);
  var workorderSync = {};
  workorderSync.createManager = function(queryParams) {
    if (workorderSync.manager) {
      return workorderSync.manager;
    } else {
      return workorderSync.managerPromise = syncService.manage(config.datasetId, null, queryParams)
      .then(function(manager) {
        workorderSync.manager = wrapManager($q, $timeout, manager);
        console.log('Sync is managing dataset:', config.datasetId, 'with filter: ', queryParams);
        return workorderSync.manager;
      })
    }
  };
  workorderSync.removeManager = function() {
    if (workorderSync.manager) {
      return workorderSync.manager.safeStop()
      .then(function() {
        delete workorderSync.manager;
      })
    }
  }
  return workorderSync;
})
;
