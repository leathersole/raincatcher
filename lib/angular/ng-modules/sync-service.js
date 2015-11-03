'use strict';

var config = require('../../config')

module.exports = 'wfm.workorder.sync';

angular.module('wfm.workorder.sync', [require('fh-wfm-sync/lib/wrappers/sync-angular')])
.run(function(syncService) {
  syncService.init($fh, config.syncOptions);
  syncService.manage(config.datasetId);
})
.factory('workorderSync', function($q, syncService) {
  return syncService;
})
;
