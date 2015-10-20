var ngModule;
try {
  ngModule = angular.module('wfm.workorder');
} catch (e) {
  ngModule = angular.module('wfm.workorder', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/vehicle-inspection.tpl.html',
    '<md-list class="vehicle-inspection">\n' +
    '  <md-list-item class="item-divider">\n' +
    '    Vehicle Inspection\n' +
    '  </md-list-item>\n' +
    '  <md-list-item>\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons">local_gas_station</md-icon>\n' +
    '      Fuel: {{vehicleInspection.fuel}}\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item>\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons">album</md-icon>\n' +
    '      Tires\n' +
    '      <md-icon md-font-set="material-icons" ng-show="vehicleInspection.tires">check_circle</md-icon>\n' +
    '      <md-icon md-font-set="material-icons" ng-show="! vehicleInspection.tires">cancel</md-icon>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item>\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons">brightness_low</md-icon>\n' +
    '      Lights\n' +
    '      <md-icon md-font-set="material-icons" ng-show="vehicleInspection.lights">check_circle</md-icon>\n' +
    '      <md-icon md-font-set="material-icons" ng-show="! vehicleInspection.lights">cancel</md-icon>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
