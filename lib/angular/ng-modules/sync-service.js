'use strict';

var config = require('../../config')

module.exports = 'wfm.workorder.sync';

angular.module('wfm.workorder.sync', ['wfm.core.mediator', require('fh-wfm-sync')])
.run(function(syncService, mediator) {
  syncService.init($fh, mediator, config.syncOptions);
  syncService.manage(config.datasetId).then(function() {
    console.log('Sync is managing dataset:', config.datasetId);
  });
})
.factory('workorderSync', function($q, syncService) {
  return syncService;
})
;
