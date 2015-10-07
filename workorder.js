'use strict';

// var angular = require('angular');
var _ = require('lodash');
var config = require('./config');
require('ng-feedhenry');

var ngModule = angular.module('wfm.workorder', ['wfm.core.mediator', 'ngFeedHenry']);

require('./lib');

var getStatusIcon = function(workorder) {
  if (! workorder) {
    return '';
  }
  var statusIcon;
  switch(workorder.status) {
    case 'In Progress':
      statusIcon = 'ion-load-d';
      break;
    case 'Complete':
      statusIcon = 'ion-ios-checkmark-outline';
      break;
    case 'Aborted':
      statusIcon = 'ion-ios-close-outline';
      break;
    case 'On Hold':
      statusIcon = 'ion-ios-minus-outline';
      break;
    case 'Unassigned':
      statusIcon = 'ion-ios-help-outline';
      break;
    case 'New':
      statusIcon = 'ion-ios-plus-outline';
      break;
    default:
      statusIcon = 'ion-ios-circle-outline';
  }
  return statusIcon;
}

ngModule.factory('workOrderManager', function($q, FHCloud) {
  var workOrderManager = {};
  var workorders;

  var removeLocalVars = function(workorder) {
    _.keys(workorder).filter(function(key) {
      return key.indexOf('_') === 0;
    }).forEach(function(localKey) {
      delete workorder[localKey];
    });
    if (workorder.steps) {
      _.values(workorder.steps).forEach(function(step) {
        _.keys(step.submission).filter(function(key) {
          return key.indexOf('_') === 0;
        }).forEach(function(localKey) {
          delete step.submission[localKey];
        });
      });
    };
  }

  var asyncValue = function(value) {
    var deferred = $q.defer();
    setTimeout(function() {
      deferred.resolve(value);
    },0);
    return deferred.promise;
  }

  var fetch = function() {
    return FHCloud.get(config.apiPath).then(function(response) {
      workorders = response;
      workorders.forEach(function(workorder) {
        removeLocalVars(workorder);
        if (workorder.finishTimestamp) {
          workorder.finishTimestamp = new Date(workorder.finishTimestamp);
        };
      });
      return workorders;
    });
  };

  workOrderManager.getList = function() {
    return workorders ? asyncValue(workorders) : fetch();
  };

  workOrderManager.get = function(id) {
    if (workorders) {
      var workorder = _.find(workorders, function(_workorder) {
        return _workorder.id == id;
      });
      return asyncValue(workorder);
    } else {
      return FHCloud.get(config.apiPath + '/' + id).then(function(response) {
        var workorder = response;
        removeLocalVars(workorder);
        if (workorder.finishTimestamp) {
          workorder.finishTimestamp = new Date(workorder.finishTimestamp);
        }
        return workorder;
      });
    }
  };

  workOrderManager.save = function(workorder) {
    removeLocalVars(workorder);
    return FHCloud.put(config.apiPath + '/' + workorder.id, angular.toJson(workorder))
    .then(function(response) {
      return FHCloud.get(config.apiPath);
    })
    .then(function(response) {
      workorders = response;
      return workorder;
    });
  };

  workOrderManager.create = function(workorder) {
    removeLocalVars(workorder);
    return FHCloud.post(config.apiPath, workorder)
    .then(function(response) {
      workorder = response;
      return FHCloud.get(config.apiPath);
    })
    .then(function(response) {
      workorders = response;
      return workorder;
    });
  };

  return workOrderManager;
})

.run(function($timeout, mediator, workOrderManager) {
  mediator.subscribe('workorder:load', function(data) {
    workOrderManager.get(data).then(function(workorder) {
      mediator.publish('workorder:loaded', workorder);
    })
  });
  mediator.subscribe('workorders:load', function() {
    workOrderManager.getList().then(function(workorders) {
      mediator.publish('workorders:loaded', workorders);
    })
  });
  mediator.subscribe('workorder:save', function(data) {
    workOrderManager.save(data).then(function(workorder) {
      mediator.publish('workorder:saved', workorder);
    })
  });
  mediator.subscribe('workorder:create', function(data) {
    workOrderManager.create(data).then(function(workorder) {
      mediator.publish('workorder:created', workorder);
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

.directive('workorderPortalView', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/workorder-portal-view.tpl.html')
  , scope: {
      workorder: '=workorder'
    , workflow: '=workflow'
    }
  };
})

.directive('workorderPortalList', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/workorder-portal-list.tpl.html')
  , scope: {
      list : '=list'
    }
  , controller: function() {
      var self = this;
      self.selectWorkorder = function(event, workorder) {
        self.selectedWorkorderId = workorder.id;
        mediator.publish('workorder:selected', workorder);
        event.preventDefault();
      }
    }
  , controllerAs: 'ctrl'
  };
})

.directive('workorderList', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/workorder-list.tpl.html')
  , scope: {
      workorders : '='
    }
  , controller: function() {
      var self = this;
      self.getStatusIcon = getStatusIcon;
      self.isWorkorderShown = function(workorder) {
        return self.shownWorkorder === workorder;
      };
      self.toggleWorkorder = function(event, workorder) {
        if (self.isWorkorderShown(workorder)) {
          self.shownWorkorder = '';
        } else {
          self.shownWorkorder = workorder;
        }
      }
    }
  , controllerAs: 'ctrl'
  };
})

.directive('workorderListItem', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/workorder-list-item.tpl.html')
  , scope: {
    workorder : '=workorder'
    }
  , controller: function($scope) {
      var self = this;
      self.showSelectButton = !! $scope.$parent.workorders;
      self.selectWorkorder = function(event, workorder) {
        mediator.publish('workorder:selected', workorder);
        event.preventDefault();
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
      if (self.model.finishTimestamp) {
        self.model.finishDate = new Date(self.model.finishTimestamp);
        self.model.finishTime = new Date(self.model.finishTimestamp);
      };
      self.done = function(isValid) {
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


;

module.exports = 'wfm.workorder';
