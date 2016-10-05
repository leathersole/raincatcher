'use strict';

module.exports = 'wfm.signature';

var ngModule = angular.module('wfm.signature', ['wfm.core.mediator']);

require('../../dist');

ngModule.directive('signatureForm', function($templateCache, $document, $timeout) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/signature-form.tpl.html')
  , scope: {
    value: '=',
    options: '='
  }
  , link: function(scope, element, attrs, ctrl) {
    console.log('touch support', 'ontouchstart' in $document[0]);
    var $canvas = angular.element(element[0].getElementsByTagName('canvas')[0]);
    $timeout(function() {
      $canvas.on('blur', function() {
        scope.$apply(function() {
          ctrl.submit(element);
        });
      });
    });
  }
  , controller: function($scope) {
    var self = this;
    self.submit = function(element) {
      var canvas = element[0].getElementsByTagName('canvas')[0];
      $scope.value = canvas.toDataURL();
    };
  }
  , controllerAs: 'ctrl'
  };
});

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
