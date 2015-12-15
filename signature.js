'use strict';

var canvasDrawr = require('./canvas-drawr');

module.exports = 'wfm.component.signature';

var ngModule = angular.module('wfm.component.signature', ['wfm.core.mediator'])

require('./dist');

ngModule.directive('signatureForm', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/signature-form.tpl.html')
  , scope: {
    }
  , controller: function($element, $scope) {
      var self = this;
      self.done = function(event) {
        var canvas = $element[0].getElementsByTagName('canvas')[0];
        self.model.signature = canvas.toDataURL();
        mediator.publish('workflow:step:done', self.model);
        event.preventDefault();
        event.stopPropagation();
      };
    }
  , controllerAs: 'ctrl'
  };
})

ngModule.directive('signature', function($templateCache, $document, $injector, mediator) {

  return {
    restrict: 'E'
  , template:
  , scope: {
      options: '='
    }
  , link: function (scope, element, attrs) {
      var options = scope.options || {};
      var drawr = new canvasDrawr.CanvasDrawr(element, options, $document);
    }
  };
})
;
