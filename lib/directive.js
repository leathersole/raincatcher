/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var ngModule = angular.module('wfm.schedule.directives', ['wfm.core.mediator']);
module.exports = 'wfm.schedule.directives';

require('../dist');

ngModule.directive('schedule', function($templateCache, $timeout, mediator) {
  function renderWorkorder(element, workorder) {
    var hourElements = element.querySelectorAll('[data-workerId="'+workorder.assignee+'"]');
    var hourElement = Array.prototype.filter.call(hourElements, function(_hourElement) {
      var hour = new Date(workorder.startTimestamp).getHours();
      return _hourElement.dataset.hour === String(hour);
    });
    if (hourElement.length) {
      hourElement[0].innerHTML = '<span class="wfm-chip wfm-chip-no-picture" style="width:300px"><span class="wfm-chip-name">'+workorder.type+' #'+workorder.id+'</span></span>';
    }
  }

  function scheduleWorkorder(scope, workorder, worker, hour) {
    workorder.assignee = worker.id;
    var date = new Date();
    date.setHours(hour);
    workorder.startTimestamp = date.getTime();
  }

  function getWorkorder(workorders, id) {
    var filtered = workorders.filter(function(workorder) {
      return String(workorder.id) === String(id);
    })
    return filtered.length ? filtered[0] : null;
  }

  function getWorker(workers, id) {
    var filtered = workers.filter(function(worker) {
      return worker.id === id;
    })
    return filtered.length ? filtered[0] : null;
  }

  return {
    restrict: 'E',
    template: $templateCache.get('wfm-template/schedule.tpl.html'),
    scope: {
      workorders : '=',
      workers: '='
    },
    link: function (scope, element, attrs) {
      // Get the three major events
      $timeout(function afterDigest() {
        var dragged = null;
        var droppables = element[0].querySelectorAll('[droppable=true]');
        Array.prototype.forEach.call(droppables, function(droppable) {
          dragged;  // this is here to overcome a chrome bug where the closure reference is lost
          droppable.addEventListener('dragover', function(e) {
            if (e.preventDefault) {
              e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'move';
            return false;
          });
          droppable.addEventListener('dragenter', function(e) {
            this.classList.add('dragover');
          });
          droppable.addEventListener('dragleave', function(e) {
            this.classList.remove('dragover');
          });
          droppable.addEventListener('drop', function(e) {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();

            this.classList.remove('dragover');
            var workorder = getWorkorder(scope.workorders, e.dataTransfer.getData('workorderid'));
            var worker = getWorker(scope.workers, this.dataset.workerid);
            var hour = this.dataset.hour;

            scheduleWorkorder(this, workorder, worker, hour);
            renderWorkorder(element[0], workorder)

            // Remove the element from the list.
            document.querySelector('.wfm-scheduler-workorders').removeChild(dragged);
            return false;
          });
        });

        var draggables = element[0].querySelectorAll('[draggable=true]');
        Array.prototype.forEach.call(draggables, function(draggable) {
          draggable.addEventListener('dragstart', function(event) {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('workorderid', draggable.dataset.workorderid);
            dragged = this;
          });
          draggable.addEventListener('dragend', function(e) {
            dragged = null;
          });
        });
      });
    },
    controller: function($scope) {
      var self = this;
      self.workorders = $scope.workorders;
      $scope.$watch('workorders', function() {
        self.workorders = $scope.workorders;
      })
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
