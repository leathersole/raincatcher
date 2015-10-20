var ngModule;
try {
  ngModule = angular.module('wfm.workorder');
} catch (e) {
  ngModule = angular.module('wfm.workorder', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/vehicle-inspection.tpl.html',
    '<md-grid-list class="vehicle-inspection" md-cols="3" md-row-height="1.5rem">\n' +
    '  <md-grid-tile md-colspan="3">\n' +
    '    <md-subheader class="md-no-sticky">Vehicle Inspection</md-subheader>\n' +
    '  </md-grid-tile>\n' +
    '\n' +
    '  <md-grid-tile md-colspan="2">\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons">local_gas_station</md-icon>\n' +
    '      Fuel:\n' +
    '    </div>\n' +
    '  </md-grid-tile>\n' +
    '  <md-grid-tile>\n' +
    '    {{vehicleInspection.fuel}}\n' +
    '  </md-grid-tile>\n' +
    '\n' +
    '  <md-grid-tile md-colspan="2">\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons">album</md-icon>\n' +
    '      Tires\n' +
    '    </div>\n' +
    '  </md-grid-tile>\n' +
    '  <md-grid-tile>\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons" ng-show="vehicleInspection.tires">check_circle</md-icon>\n' +
    '      <md-icon md-font-set="material-icons" ng-show="! vehicleInspection.tires">cancel</md-icon>\n' +
    '    </div>\n' +
    '  </md-grid-tile>\n' +
    '\n' +
    '  <md-grid-tile md-colspan="2">\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons">brightness_low</md-icon>\n' +
    '      Lights\n' +
    '    </div>\n' +
    '  </md-grid-tile>\n' +
    '  <md-grid-tile>\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons" ng-show="vehicleInspection.lights">check_circle</md-icon>\n' +
    '      <md-icon md-font-set="material-icons" ng-show="! vehicleInspection.lights">cancel</md-icon>\n' +
    '    </div>\n' +
    '  </md-grid-tile>\n' +
    '</md-grid-list>\n' +
    '');
}]);
