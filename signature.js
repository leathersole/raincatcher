/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var canvasDrawr = require('./lib/canvas-drawr');

module.exports = 'wfm.component.signature';

var ngModule = angular.module('wfm.component.signature', ['wfm.core.mediator'])

require('./dist');

ngModule.directive('signatureForm', function($templateCache, $document, $timeout, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/signature-form.tpl.html')
  , scope: {
      value: '=',
      options: '='
    }
  , link: function (scope, element, attrs, ctrl) {
      var options = scope.options || {};
      console.log('touch support', 'ontouchstart' in $document[0]);
      var drawr = 'ontouchstart' in $document[0]
        ? new canvasDrawr.CanvasDrawr(element, options, $document)
        : new canvasDrawr.CanvasDrawrMouse(element, options, $document);

      var $canvas = angular.element(element[0].getElementsByTagName('canvas')[0]);
      $timeout(function() {
        $canvas.on('blur', function() {
          scope.$apply(function() {
            ctrl.submit(element);
          })
        });
      })
    }
  , controller: function($scope) {
      var self = this;
      self.submit = function(element) {
        var canvas = element[0].getElementsByTagName('canvas')[0];
        $scope.value = canvas.toDataURL();
      }
    }
  , controllerAs: 'ctrl'
  };
})

ngModule.directive('signature', function($templateCache) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/signature.tpl.html')
  , scope: {
      value: '='
    }
  , controller: function($scope) {
      var self = this;
      self.signature = $scope.value;
    }
  , controllerAs: 'ctrl'
  };
})
;
