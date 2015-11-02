'use strict';

var config = require('../../config')

module.exports = 'wfm.workorder.sync';

angular.module('wfm.workorder.sync', ['wfm.core.mediator', require('fh-wfm-sync/lib/ng-modules/sync-service')])
.run(function(mediator, syncService) {
  syncService.init($fh, mediator, config.datasetId, config.syncOptions);
  syncService.start();
})
.factory('workorderSync', function($q, mediator, syncService) {
  return syncService;
})
;
