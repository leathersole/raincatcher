'use strict';

module.exports = 'wfm.workorder.mediator';

angular.module('wfm.workorder.mediator', [
  'wfm.core.mediator'
, require('../ng-modules/directives')
, require('../ng-modules/sync-service')
])
.run(function($timeout, mediator, workorderSync) {
  mediator.subscribe('module:init:workorder', function(data) {
    workorderSync.managerPromise.then(function() {
      mediator.publish('done:module:init:workorder');
    }, function(error) {
      mediator.publish('error:module:init:workorder');
    });
  });
  mediator.subscribe('workorder:load', function(data, ts) {
    workorderSync.manager.read(data).then(function(workorder) {
      mediator.publish('done:workorder:load:' + workorder.id, workorder);
    }, function(error) {
      console.error(error);
    })
  });
  mediator.subscribe('workorders:load', function() {
    workorderSync.manager.list().then(function(workorders) {
      mediator.publish('done:workorders:load', workorders);
    }, function(error) {
      console.error(error);
    })
  });
  mediator.subscribe('workorder:save', function(data) {
    workorderSync.manager.update(data).then(function(workorder) {
      mediator.publish('done:workorder:save:' + workorder.id, workorder);
    }, function(error) {
      console.error(error);
    })
  });
  mediator.subscribe('workorder:create', function(data) {
    workorderSync.manager.create(data).then(function(workorder) {
      mediator.publish('done:workorder:create', workorder);
    }, function(error) {
      console.error(error);
    })
  });
  mediator.subscribe('workorder:new', function(data) {
    workorderSync.manager.new().then(function(workorder) {
      mediator.publish('done:workorder:new', workorder);
    }, function(error) {
      console.error(error);
    })
  });
})
;
