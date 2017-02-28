'use strict';

var ngModule = angular.module('wfm.vehicle-inspection', ['wfm.core.mediator']);

require('../../dist');

ngModule.directive('vehicleInspection', function($templateCache) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/vehicle-inspection.tpl.html')
  , scope: {
    vehicleInspection: '=value'
  }
  };
});

ngModule.directive('vehicleInspectionForm', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/vehicle-inspection-form.tpl.html')
  , scope: {
  }
  , controller: function() {
    var self = this;
    self.model = {};
    self.back = function(event) {
      mediator.publish('wfm:workflow:step:back');
      event.preventDefault();
      event.stopPropagation();
    };
    self.done = function(event) {
      mediator.publish('wfm:workflow:step:done', self.model);
      event.preventDefault();
      event.stopPropagation();
    };
  }
  , controllerAs: 'ctrl'
  };
});

module.exports = 'wfm.vehicle-inspection';
