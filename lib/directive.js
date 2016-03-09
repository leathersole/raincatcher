/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var ngModule = angular.module('wfm.schedule.directives', ['wfm.core.mediator']);
module.exports = 'wfm.schedule.directives';

require('../dist');

ngModule.directive('schedule', function($templateCache, mediator) {
  return {
    restrict: 'E',
    template: $templateCache.get('wfm-template/schedule.tpl.html'),
    scope: {
      workorders : '=',
      workers: '='
    },
    controller: function($scope, $templateCache) {
      console.log($templateCache.get('wfm-template/schedule.tpl.html'));
      var self = this;
      self.workorders = $scope.workorders;
      self.workers = $scope.workers;
      var workordersOnDate = self.workorders.filter(function(workorder) {
        return true; // TODO: apply a date selective filter here
      });
      var workordersByWorker = {};
      workordersOnDate.forEach(function(workorder) {
        workordersByWorker[workorder.assignee] = workordersByWorker[workorder.assignee] || [];
        workordersByWorker[workorder.assignee].push(workorder);
      });

      self.timegrid = {};
      self.workers.forEach(function(worker) {
        self.timegrid[worker.id] = [];
        for (var i = 0; i < 24; i++) {
          self.timegrid[worker.id][i] = null;
        }
        var workorders = workordersByWorker[worker.id]
        if (workorders) {
          workorders.forEach(function(workorder) {
            var duration = 3; // hours
            var hour = new Date(workorder.startTimestamp).getHours();
            var timeslot = self.timegrid[workorder.assignee][hour];
            if (timeslot) {
              self.timegrid[workorder.assignee][hour] = {
                title: 'conflict'
              }
            } else {
              self.timegrid[workorder.assignee][hour] = {
                title: workorder.type + ' #' + workorder.id
              }
            }
          });
        }
      });

      console.log(self.timegrid);

    },
    controllerAs: 'ctrl'
  };
})
