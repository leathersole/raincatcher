/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var _ = require('lodash');
var config = require('../../config');
require('ng-feedhenry');

module.exports = 'wfm.message.rest';

angular.module('wfm.message.rest', ['wfm.core.mediator', 'ngFeedHenry'])
.factory('messageRest', function($q, FHCloud) {
  var messageRest = {};
  var messages;

  var removeLocalVars = function(message) {
    _.keys(message).filter(function(key) {
      return key.indexOf('_') === 0;
    }).forEach(function(localKey) {
      delete message[localKey];
    });
    if (message.results) {
      _.values(message.results).forEach(function(result) {
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
      messages = response;
      messages.forEach(function(message) {
        removeLocalVars(message);
        if (message.finishTimestamp) {
          message.finishTimestamp = new Date(message.finishTimestamp);
        };
      });
      return messages;
    });
  };

  messageRest.list = function() {
    return messages ? asyncValue(messages) : fetch();
  };

  messageRest.read = function(id) {
    if (messages) {
      var message = _.find(messages, function(_message) {
        return _message.id == id;
      });
      return asyncValue(message);
    } else {
      return FHCloud.get(config.apiPath + '/' + id).then(function(response) {
        var message = response;
        removeLocalVars(message);
        if (message.finishTimestamp) {
          message.finishTimestamp = new Date(message.finishTimestamp);
        }
        return message;
      });
    }
  };

  messageRest.update = function(message) {
    removeLocalVars(message);
    return FHCloud.put(config.apiPath + '/' + message.id, angular.toJson(message))
    .then(function(response) {
      return FHCloud.get(config.apiPath);
    })
    .then(function(response) {
      messages = response;
      return message;
    });
  };

  messageRest.create = function(message) {
    removeLocalVars(message);
    return FHCloud.post(config.apiPath, message)
    .then(function(response) {
      message = response;
      return FHCloud.get(config.apiPath);
    })
    .then(function(response) {
      messages = response;
      return message;
    });
  };

  return messageRest;
})
;
