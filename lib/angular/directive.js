/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var ngModule = angular.module('wfm.schedule.directives', ['wfm.core.mediator']);
module.exports = 'wfm.schedule.directives';

var _ = require('lodash');

require('../../dist');

ngModule.directive('schedule', function($templateCache, $compile, $timeout, mediator) {
  function getWorkerRowElements(element, workerId) {
    return element.querySelectorAll('[data-workerId="'+workerId+'"]');
  }

  function getHourElement(rowElements, hour) {
    var hourElement = Array.prototype.filter.call(rowElements, function(_hourElement) {
      return _hourElement.dataset.hour === String(hour);
    });
    return (hourElement.length) ? hourElement[0] : null;
  }

  function renderWorkorder(scope, hourElement, workorder) {
    var element = angular.element(hourElement);
    var _workorder = scope.workorder;
    scope.workorder = workorder;
    var chip = angular.element('<schedule-workorder-chip workorder="workorder" scheduled="true" draggable="true"></schedule-workorder-chip>');

    element.append(chip);
    $compile(chip)(scope);
    chip[0].id = workorder.id;
    chip[0].addEventListener('dragstart', function(event) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('workorderid', workorder.id);
    });
    scope.workorder = _workorder;
  }

  function renderWorkorders(scope, element, workorders) {
    var workordersByWorker = {};
    workorders.forEach(function(workorder) {
      workordersByWorker[workorder.assignee] = workordersByWorker[workorder.assignee] || [];
      workordersByWorker[workorder.assignee].push(workorder);
    });

    _.forIn(workordersByWorker, function(workorders, workerId) {
      var workerRowElements = getWorkerRowElements(element, workerId);
      workorders.forEach(function(workorder) {
        var hour = new Date(workorder.startTimestamp).getHours();
        var hourElement = getHourElement(workerRowElements, hour);
        if (hourElement) {
          renderWorkorder(scope, hourElement, workorder);
        }
      });
    });
  }

  function scheduleWorkorder(workorder, workerId, hour) {
    workorder.assignee = workerId;
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

  function removeWorkorders(element) {
    var hourElements = element.querySelectorAll('[droppable=true]');
    Array.prototype.forEach.call(hourElements, function(hourElement) {
      while (hourElement.firstChild) {
        hourElement.removeChild(hourElement.firstChild);
      }
    });
  }

  function render(scope, ctrl, element) {
    var workordersOnDate = scope.workorders.filter(function(workorder) {
      return new Date(workorder.startTimestamp).toDateString() === ctrl.scheduleDate.toDateString();
    });
    renderWorkorders(scope, element, workordersOnDate);
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
            if(e.currentTarget.id != 'workorders-list'){
              this.classList.remove('dragover');
              var workorder = getWorkorder(scope.workorders, e.dataTransfer.getData('workorderid'));
              var worker = getWorker(scope.workers, this.dataset.workerid);
              var hour = this.dataset.hour;
              var dropped = dragged;

              var dropElement = this;
              scope.$apply(function() {
                var scheduledWorkorder = angular.copy(workorder);
                scheduleWorkorder(scheduledWorkorder, worker.id, hour);
                mediator.request('wfm:schedule:workorder', scheduledWorkorder, {uid: scheduledWorkorder.id})
                .then(function(savedWorkorder) {
                  var previousChipElement = document.getElementById(savedWorkorder.id);
                  if(previousChipElement){
                    previousChipElement.parentNode.removeChild(previousChipElement);
                  }

                  renderWorkorder(scope, dropElement, savedWorkorder);
                  if(dropped) {
                    element[0].querySelector('.wfm-scheduler-workorders').removeChild(dropped);
                    var index = scope.workorders.indexOf(workorder);
                    if (~index) {
                      scope.workorders[index] = savedWorkorder;
                    }
                  }
                }, function(error) {
                  console.error(error);
                })
              })
              // Remove the element from the list.
              return false;
            }
          });
        });

        var droppableBack = element[0].querySelector('.wfm-scheduler-workorders');
        droppableBack.addEventListener('dragover', function(e) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          e.dataTransfer.dropEffect = 'move';
          return false;
        });
        droppableBack.addEventListener('dragenter', function(e) {
          this.classList.add('dragover');
        });
        droppableBack.addEventListener('dragleave', function(e) {
          this.classList.remove('dragover');
        });

        //TODO this should be merged wit the global drop listener
        droppableBack.addEventListener('drop', function(e) {
          if (e.preventDefault) e.preventDefault();
          if (e.stopPropagation) e.stopPropagation();
          var workorder = getWorkorder(scope.workorders, e.dataTransfer.getData('workorderid'));
          this.classList.remove('dragover');
          scope.$apply(function() {
            var scheduledWorkorder = angular.copy(workorder);
            scheduledWorkorder.startTimestamp = null;
            mediator.request('wfm:schedule:workorder', scheduledWorkorder, {uid: scheduledWorkorder.id})
            .then(function(savedWorkorder) {
              var element = document.getElementById(savedWorkorder.id);
              if(element){
                element.parentNode.removeChild(element);
              }
              var index = scope.workorders.indexOf(workorder);
              if (~index) {
                scope.workorders[index] = savedWorkorder;
                e.target.addEventListener('dragstart', function(event) {
                  event.dataTransfer.effectAllowed = 'move';
                  event.dataTransfer.setData('workorderid', savedWorkorder.id);
                });
              }

            }, function(error) {
              console.error(error);
            })
          })
        });
        var draggables = element[0].querySelectorAll('[draggable=true]');
        Array.prototype.forEach.call(draggables, function(draggable) {
          if(!draggable.attributes.scheduled) {
          draggable.addEventListener('dragstart', function(event) {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('workorderid', draggable.dataset.workorderid);
            dragged = this;
          });
          draggable.addEventListener('dragend', function(e) {
            dragged = null;
          });
        }
        });
      });
    },
    controller: function($scope, $timeout, $element) {
      var self = this;
      self.scheduleDate = new Date();
      self.dateChange = function() {
        removeWorkorders($element[0]);
        render($scope, self, $element[0]);
      }
      $timeout(function() {
        render($scope, self, $element[0]);
      })
      self.workorders = $scope.workorders;
      $scope.$watch('workorders', function() {
        self.workorders = $scope.workorders;
      })
      self.workers = $scope.workers;
      $scope.workOrderfilter  = function(workorder) {
        return workorder.assignee == null || workorder.startTimestamp == null;
      };

    },
    controllerAs: 'ctrl'
  };
});

ngModule.directive('scheduleWorkorderChip', function($templateCache) {
  return {
    restrict: 'E',
    template: $templateCache.get('wfm-template/schedule-workorder-chip.tpl.html'),
    scope: {
      workorder : '='
    },
    controller: function($scope) {
      this.workorder = $scope.workorder;
    },
    controllerAs: 'ctrl'
  };
});
