'use strict';

var ngModule = angular.module('wfm.message.directives', ['wfm.core.mediator']);
module.exports = 'wfm.message.directives';

require('../../../dist');

var getStatusIcon = function(status) {
  var statusIcon;
  switch(status) {
    case 'Unread':
      statusIcon = 'unread';
      break;
    case 'Read':
      statusIcon = 'read';
      break;
    default:
      statusIcon = 'unread';
  }
  return statusIcon;
}

ngModule.directive('messageList', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/message-list.tpl.html')
  , scope: {
      list : '=list'
    }
  , controller: function() {
      var self = this;
      self.getStatusIcon = function() {
        return getStatusIcon(ctrl.message.status);
      };
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

.directive('message', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/message.tpl.html')
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
