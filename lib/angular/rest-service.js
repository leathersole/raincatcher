/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var _ = require('lodash');
var config = require('../config');
require('ng-feedhenry');

module.exports = 'wfm.workorder.rest';

angular.module('wfm.workorder.rest', ['wfm.core.mediator', 'ngFeedHenry'])
.factory('workorderRest', function($q, FHCloud) {
  var workorderRest = {};
  var workorders;

  var removeLocalVars = function(workorder) {
    _.keys(workorder).filter(function(key) {
      return key.indexOf('_') === 0;
    }).forEach(function(localKey) {
      delete workorder[localKey];
    });
    if (workorder.results) {
      _.values(workorder.results).forEach(function(result) {
        _.keys(result.submission).filter(function(key) {
          return key.indexOf('_') === 0;
        }).forEach(function(localKey) {
          delete result.submission[localKey];
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
        if (workorder.startTimestamp) {
          workorder.startTimestamp = new Date(workorder.startTimestamp);
        };
      });
      return workorders;
    });
  };

  workorderRest.list = function() {
    return workorders ? asyncValue(workorders) : fetch();
  };

  workorderRest.read = function(id) {
    if (workorders) {
      var workorder = _.find(workorders, function(_workorder) {
        return _workorder.id == id;
      });
      return asyncValue(workorder);
    } else {
      return FHCloud.get(config.apiPath + '/' + id).then(function(response) {
        var workorder = response;
        removeLocalVars(workorder);
        if (workorder.startTimestamp) {
          workorder.startTimestamp = new Date(workorder.startTimestamp);
        }
        return workorder;
      });
    }
  };

  workorderRest.update = function(workorder) {
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

  workorderRest.create = function(workorder) {
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

  return workorderRest;
})
;
