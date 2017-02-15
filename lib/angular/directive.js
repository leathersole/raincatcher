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
    var chip = angular.element('<schedule-workorder-chip workorder="workorder" draggable="true"></schedule-workorder-chip>');

    if (!parentElement.classList.contains('wfm-scheduler-unscheduled')) {
      var hourElement = parentElement;
      parentElement = document.querySelector('.wfm-scheduler-scheduled');
      angular.element(parentElement).append(chip);
      $compile(chip)(scope);
      $timeout(function() {
        chip[0].style.position = 'absolute';
        chip[0].style.left = hourElement.offsetLeft + 'px';
        chip[0].style.top = hourElement.offsetTop + 'px';
      });
    } else {
      element.append(chip);
      $compile(chip)(scope);
    }
    chip[0].id = workorder.id;
    chip[0].dataset.workorderId = workorder.id;
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

    //A workorder is unscheduled if it has no assigned user or it has no start time.
    var unscheduled = scope.workorders.filter(function(workorder) {
      return !workorder.assignee || !workorder.startTimestamp;
    });
    var unscheduledWorkorderList = element.querySelector('.wfm-scheduler-unscheduled');
    unscheduled.forEach(function(workorder) {
      renderWorkorder(scope, unscheduledWorkorderList, workorder);
    });
  }

  function scheduleWorkorder(workorder, workerId, date, hour) {
    workorder.assignee = workerId;
    if (date !== null && hour !== null) {
      date.setHours(hour);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      workorder.startTimestamp = date.getTime();
    } else {
      workorder.startTimestamp = null;
    }
  }

  function getWorkorder(workorders, id) {
    var filtered = workorders.filter(function(workorder) {
      return String(workorder.id) === String(id);
    });
    return filtered.length ? filtered[0] : null;
  }

  function removeWorkorders(element) {
    var scheduled = element.querySelector('.wfm-scheduler-scheduled');
    while (scheduled.hasChildNodes()) {
      scheduled.removeChild(scheduled.firstChild);
    }
  }

  function render(scope, ctrl, element) {
    var workordersOnDate = scope.workorders.filter(function(workorder) {
      return new Date(workorder.startTimestamp).toDateString() === ctrl.scheduleDate.toDateString();
    });
    renderWorkorders(scope, element, workordersOnDate);
  }

  function updateWorkorder(workorder) {
    return mediator.request('wfm:schedule:workorder', workorder, {uid: workorder.id});
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
      parentElement = getHourElement(workerRowElements, hour);
    }
    parentElement = parentElement || schedulerElement[0].querySelector('.wfm-scheduler-unscheduled');
    renderWorkorder(scope, parentElement, workorder);
    var index = _.findIndex(scope.workorders, function(_workorder) {
      return _workorder.id === workorder.id;
    });
    if (index >= 0) {
      scope.workorders[index] = workorder;
    }
  }

  function dragover(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function dragenter() {
    this.classList.add('dragover');
  }

  function dragleave() {
    this.classList.remove('dragover');
  }

  function drop(e, scope, schedulerElement) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    var workorder = getWorkorder(scope.workorders, e.dataTransfer.getData('workorderid'));
    var dropElement = e.currentTarget;
    dropElement.classList.remove('dragover');
    var scheduledWorkorder = angular.copy(workorder);
    if (dropElement.id === 'workorders-list') {
      scheduleWorkorder(scheduledWorkorder, null, null, null);
    } else {
      var workerId = dropElement.dataset.workerid;
      var hour = dropElement.dataset.hour;
      scheduleWorkorder(scheduledWorkorder, workerId, scope.ctrl.scheduleDate, hour);
    }
    updateWorkorder(scheduledWorkorder)
      .then(function(updated) {
        workorderUpdated(scope, schedulerElement, updated);
      })
      .catch(function(error) {
        console.error(error);
      });
    return false;
  }

  function sizeCalendar(element) {
    var calendar = element[0].querySelector('.wfm-scheduler-calendar');
    calendar.style.position = 'inherit';
    var width =  calendar.clientWidth;
    calendar.style.position = 'absolute';
    calendar.style.width = width + 'px';
  }

  return {
    restrict: 'E',
    template: $templateCache.get('wfm-template/schedule.tpl.html'),
    scope: {
      workorders : '=',
      workers: '='
    },
    link: function(scope, element) {
      // Get the three major events
      $timeout(function afterDigest() {
        sizeCalendar(element);
        element[0].addEventListener('dragstart', function(event) {
          if (!event.srcElement.getAttribute || event.srcElement.getAttribute('draggable') !== 'true') {
            event.preventDefault();
            return;
          }
          var chip = event.srcElement;
          event.dataTransfer.effectAllowed = 'move';
          event.dataTransfer.setData('workorderid', chip.dataset.workorderId);
        });
        var droppables = element[0].querySelectorAll('[droppable=true]');

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
    controller: function($scope, $timeout, $element, $window) {
      var self = this;
      self.scheduleDate = new Date();
      $window.addEventListener('resize', function() {
        sizeCalendar($element);
      });
      renderUnscheduledWorkorderList($scope, self, $element[0]);
      self.dateChange = function() {
        removeWorkorders($element[0]);
        render($scope, self, $element[0]);

      };
      $timeout(function() {
        render($scope, self, $element[0]);
      });
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
