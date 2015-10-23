'use strict';

var canvasDrawr = require('./canvas-drawr');

var ngModule = angular.module('wfm.risk-assessment', ['wfm.core.mediator'])

require('./lib');

ngModule.directive('riskAssessment', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/risk-assessment.tpl.html')
  , scope: {
      riskAssessment: "=value"
    }
  , controller: function($element, $scope) {
      var self = this;
    }
  , controllerAs: 'ctrl'
  };
})

ngModule.directive('riskAssessmentForm', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/risk-assessment-form.tpl.html')
  , scope: {
    }
  , controller: function($element, $scope) {
      var self = this;
      $scope.riskAssessmentStep = 0
      self.model = {};
      self.answerComplete = function(event, answer) {
        self.model.complete = answer;
        $scope.riskAssessmentStep++;
        event.preventDefault();
        event.stopPropagation();
      };
      self.done = function(event) {
        // TODO: attach a Base64 encoded string of the signature image to the model
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

ngModule.directive('riskAssessmentSignature', function($templateCache, $document, $injector, mediator) {

  return {
    restrict: 'E'
  , template: '<div class="appform-signature-field" style="display: flex; flex-grow: 1;"><canvas></canvas></div>'
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

module.exports = 'wfm.risk-assessment';
