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

  function renderWorkorder(scope, parentElement, workorder) {
    var element = angular.element(parentElement);
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

  function renderUnscheduledWorkorderList(scope, ctrl, element) {
    var unscheduled = scope.workorders.filter(function(workorder) {
      return workorder.assignee == null || workorder.startTimestamp == null;
    });
    var unscheduledWorkorderList = element.querySelector('.wfm-scheduler-workorders');
    unscheduled.forEach(function(workorder) {
      renderWorkorder(scope, unscheduledWorkorderList, workorder);
    })
  }

  function scheduleWorkorder(workorder, workerId, hour) {
    workorder.assignee = workerId;
    if (hour !== null) {
      var date = new Date();
      date.setHours(hour);
      workorder.startTimestamp = date.getTime();
    } else {
      workorder.startTimestamp = null;
    }
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
    var hourElements = element.querySelectorAll('.wfm-scheduler [droppable=true]');
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

  function updateWorkorder(workorder) {
    return mediator.request('wfm:schedule:workorder', workorder, {uid: workorder.id})
  }

  function workorderUpdated(scope, schedulerElement, workorder) {
    var previousChipElement = document.getElementById(workorder.id);
    if (previousChipElement) {
      previousChipElement.parentNode.removeChild(previousChipElement);
    }
    var parentElement;
    if (workorder.assignee && workorder.startTimestamp) {
      var workerRowElements = getWorkerRowElements(schedulerElement[0], workorder.assignee);
      var hour = new Date(workorder.startTimestamp).getHours();
      var parentElement = getHourElement(workerRowElements, hour);
    }
    parentElement = parentElement || schedulerElement[0].querySelector('.wfm-scheduler-workorders');
    renderWorkorder(scope, parentElement, workorder);
    var index = scope.workorders.indexOf(workorder);
    if (~index) {
      scope.$apply(function() {
        scope.workorders[index] = workorder;
      });
    }
  }

  function dragover(e, scope) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  };

  function dragenter(e) {
    this.classList.add('dragover');
  };

  function dragleave(e) {
    this.classList.remove('dragover');
  };

  function drop(e, scope, schedulerElement, unscheduledWorkorderList) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    var workorder = getWorkorder(scope.workorders, e.dataTransfer.getData('workorderid'));
    var dropElement = e.currentTarget;
    dropElement.classList.remove('dragover');
    var scheduledWorkorder = angular.copy(workorder);
    if (dropElement.id === 'workorders-list') {
      scheduleWorkorder(scheduledWorkorder, null, null);
    } else {
      var workerId = dropElement.dataset.workerid;
      var hour = dropElement.dataset.hour;
      scheduleWorkorder(scheduledWorkorder, workerId, hour);
    }
    updateWorkorder(scheduledWorkorder)
      .then(function(updated) {
                  var index = scope.workorders.indexOf(workorder);
                  if (~index) {
                    scope.workorders[index] = savedWorkorder;
                  }
      })
      .catch(function(error) {
        console.error(error);
      })
    return false;
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
        var droppables = element[0].querySelectorAll('[droppable=true]');
        var unscheduledWorkorderList = element[0].querySelector('.wfm-scheduler-workorders');

        Array.prototype.forEach.call(droppables, function(droppable) {
          droppable.addEventListener('dragover', dragover);
          droppable.addEventListener('dragenter', dragenter);
          droppable.addEventListener('dragleave', dragleave);
          droppable.addEventListener('drop', function(e) {
            return drop(e, scope, element);
          });
        });
      });
    },
    controller: function($scope, $timeout, $element) {
      var self = this;
      self.scheduleDate = new Date();
      renderUnscheduledWorkorderList($scope, self, $element[0]);
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
