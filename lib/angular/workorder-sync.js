'use strict';

module.exports = 'wfm.workorder';

angular.module('wfm.workorder', [
  'wfm.core.mediator'
, require('./ng-modules/directives')
, require('./ng-modules/sync-service')
])
.run(function($timeout, mediator, workorderSync) {
  mediator.subscribe('workorder:load', function(data) {
    workorderSync.read(data).then(function(workorder) {
      mediator.publish('workorder:loaded', workorder);
    }, function(error) {
      console.error(error);
    })
  });
  mediator.subscribe('workorders:load', function() {
    workorderSync.list().then(function(workorders) {
      mediator.publish('workorders:loaded', workorders);
    }, function(error) {
      console.error(error);
    })
  });
  mediator.subscribe('workorder:save', function(data) {
    workorderSync.update(data).then(function(syncResult) {
      mediator.publish('workorder:saved:' + syncResult.uid, syncResult); // TODO: unwrap the sync result, extracting the workorder
    }, function(error) {
      console.error(error);
    })
  });
  mediator.subscribe('workorder:create', function(data) {
    workorderSync.create(data).then(function(workorder) {
      mediator.publish('workorder:created', workorder);
    }, function(error) {
      console.error(error);
    })
  });
  mediator.subscribe('workorder:new', function(data) {
    $timeout(function() {
      var workorder = {
        type: 'Job Order'
      , status: 'New'
      };
      mediator.publish('workorder:new:done', workorder);
    })
  });
})
;
