/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var ngModule = angular.module('wfm.message.directives', ['wfm.core.mediator']);
module.exports = 'wfm.message.directives';

require('../../../dist');

ngModule.directive('messageList', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/message-list.tpl.html')
  , scope: {
      list : '=list'
    }
  , controller: function($scope) {
        var self = this;
        self.list = $scope.list;
        self.selected = $scope.selectedModel;
        self.selectMessage = function(event, message) {
        self.selectedMessageId = message.id;
        mediator.publish('message:selected', message);
        event.preventDefault();
        event.stopPropagation();
      }
      self.ismessageShown = function(message) {
        return self.shownmessage === message;
      };
    }
  , controllerAs: 'ctrl'
  };
})

.directive('messageForm', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/message-form.tpl.html')
  , scope: {
    message : '=value'
  , workers: '='
    }
  , controller: function($scope) {
      var self = this;
      self.model = angular.copy($scope.message);
      self.workers = $scope.workers;
      self.submitted = false;
      self.done = function(isValid) {
        self.submitted = true;
        if (isValid) {
            mediator.publish('message:created', self.model);
        }
      }
    }
  , controllerAs: 'ctrl'
  };
})

.directive('message', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/message-detail.tpl.html')
  , scope: {
    message : '=message'
    }
  , controller: function($scope) {
      var self = this;
      self.showSelectButton = !! $scope.$parent.messages;
      self.selectmessage = function(event, message) {
        mediator.publish('message:selected', message);
        event.preventDefault();
        event.stopPropagation();
      }
    }
  , controllerAs: 'ctrl'
  };
})
;
