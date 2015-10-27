'use strict';

module.exports = 'wfm.workorder';

angular.module('wfm.workorder', [
  'wfm.core.mediator'
, require('./ng-modules/directives')
, require('./ng-modules/rest-service')
])
.run(function($timeout, mediator, workorderRest) {
  mediator.subscribe('workorder:load', function(data) {
    workorderRest.read(data).then(function(workorder) {
      mediator.publish('done:workorder:load', workorder);
    }, function(error) {
      console.error(error);
      mediator.publish('error:workorder:load', error);
    })
  });
  mediator.subscribe('workorders:load', function() {
    workorderRest.list().then(function(workorders) {
      mediator.publish('done:workorders:load', workorders);
    }, function(error) {
      console.error(error);
      mediator.publish('error:workorders:load', error);
    })
  });
  mediator.subscribe('workorder:save', function(data) {
    workorderRest.update(data).then(function(syncResult) {
      mediator.publish('done:workorder:save:' + syncResult.uid, syncResult); // TODO: unwrap the sync result, extracting the workorder
    }, function(error) {
      console.error(error);
      mediator.publish('error:workorder:save', error);
    })
  });
  mediator.subscribe('workorder:create', function(data) {
    workorderRest.create(data).then(function(workorder) {
      mediator.publish('done:workorder:create', workorder);
    }, function(error) {
      console.error(error);
      mediator.publish('error:workorder:create', error);
    })
  });
  mediator.subscribe('workorder:new', function(data) {
    $timeout(function() {
      var workorder = {
        type: 'Job Order'
      , status: 'New'
      };
      mediator.publish('done:workorder:new', workorder);
    })
  });
})
