'use strict';

// var angular = require('angular');
var _ = require('lodash');
var config = require('./config');
var sync = require('./lib/sync-client');
require('ng-feedhenry');

var ngModule = angular.module('wfm.workorder', ['wfm.core.mediator', 'ngFeedHenry']);

require('./dist');

var getStatusIcon = function(status) {
  var statusIcon;
  switch(status) {
    case 'In Progress':
      statusIcon = 'autorenew';
      break;
    case 'Complete':
      statusIcon = 'assignment_turned_in';
      break;
    case 'Aborted':
      statusIcon = 'assignment_late';
      break;
    case 'On Hold':
      statusIcon = 'pause';
      break;
    case 'Unassigned':
      statusIcon = 'assignment_ind';
      break;
    case 'New':
      statusIcon = 'new_releases';
      break;
    default:
      statusIcon = 'radio_button_unchecked';
  }
  return statusIcon;
}

sync.init();

ngModule.factory('workorderManager', function($q, FHCloud, mediator) {
  var workorderManager = {};

  workorderManager.read = function(id) {
    return $q.when(sync.read(id));
  };

  workorderManager.list = function() {
    return $q.when(sync.list());
  };

  workorderManager.update = function(workorder) {
    return $q.when(sync.update(workorder));
  };

  workorderManager.create = function(workorder) {
    return $q.when(sync.create(workorder));
  };

  return workorderManager;
})

.run(function($timeout, mediator, workorderManager) {
  mediator.subscribe('workorder:load', function(data) {
    workorderManager.read(data).then(function(workorder) {
      mediator.publish('workorder:loaded', workorder);
    }, function(error) {
      console.error(error);
    })
  });
  mediator.subscribe('workorders:load', function() {
    workorderManager.list().then(function(workorders) {
      mediator.publish('workorders:loaded', workorders);
    }, function(error) {
      console.error(error);
    })
  });
  mediator.subscribe('workorder:save', function(data) {
    workorderManager.update(data).then(function(syncResult) {
      mediator.publish('workorder:saved:' + syncResult.uid, syncResult); // TODO: unwrap the sync result, extracting the workorder
    }, function(error) {
      console.error(error);
    })
  });
  mediator.subscribe('workorder:create', function(data) {
    workorderManager.create(data).then(function(workorder) {
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

.directive('workorderList', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/workorder-list.tpl.html')
  , scope: {
      list : '=list'
    }
  , controller: function() {
      var self = this;
      self.getStatusIcon = function() {
        return getStatusIcon(ctrl.workorder.status);
      };
      self.selectWorkorder = function(event, workorder) {
        self.selectedWorkorderId = workorder.id;
        mediator.publish('workorder:selected', workorder);
        event.preventDefault();
        event.stopPropagation();
      }
      self.isWorkorderShown = function(workorder) {
        return self.shownWorkorder === workorder;
      };
    }
  , controllerAs: 'ctrl'
  };
})

.directive('workorder', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/workorder.tpl.html')
  , scope: {
    workorder : '=workorder'
    }
  , controller: function($scope) {
      var self = this;
      self.showSelectButton = !! $scope.$parent.workorders;
      self.selectWorkorder = function(event, workorder) {
        mediator.publish('workorder:selected', workorder);
        event.preventDefault();
        event.stopPropagation();
      }
    }
  , controllerAs: 'ctrl'
  };
})

.directive('workorderForm', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/workorder-form.tpl.html')
  , scope: {
    workorder : '=value'
  , workflows: '='
    }
  , controller: function($scope) {
      var self = this;
      self.model = angular.copy($scope.workorder);
      self.workflows = $scope.workflows;
      self.submitted = false;
      if (self.model.finishTimestamp) {
        self.model.finishDate = new Date(self.model.finishTimestamp);
        self.model.finishTime = new Date(self.model.finishTimestamp);
      };
      self.done = function(isValid) {
        self.submitted = true;
        if (isValid) {
          self.model.finishTimestamp = new Date(self.model.finishDate); // TODO: incorporate self.model.finishTime
          delete self.model.finishDate;
          delete self.model.finishTime;
          mediator.publish('workorder:edited', self.model);
        }
      }
    }
  , controllerAs: 'ctrl'
  };
})

.directive('workorderStatus', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: '<md-icon md-font-set="material-icons">{{statusIcon}}</md-icon>'
  , scope: {
      status : '=status'
    }
  , controller: function($scope) {
      $scope.statusIcon = getStatusIcon($scope.status);
    }
  , controllerAs: 'ctrl'
  }
})

module.exports = 'wfm.workorder';
