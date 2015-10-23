var ngModule;
try {
  ngModule = angular.module('wfm.workorder');
} catch (e) {
  ngModule = angular.module('wfm.workorder', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/vehicle-inspection.tpl.html',
    '<md-list class="risk-assessment">\n' +
    '  <md-list-item>\n' +
    '    <md-subheader class="md-no-sticky"><h3>Vehicle Inspection</h3></md-subheader>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item>\n' +
    '    <div flex="30" layout layout-align="start center" style="padding-left: 16px;">\n' +
    '      <span class="md-body-2">Fuel</span>\n' +
    '    </div>\n' +
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
    '      Tires\n' +
    '      <md-icon md-font-set="material-icons" ng-show="vehicleInspection.lights">check_circle</md-icon>\n' +
    '      <md-icon md-font-set="material-icons" ng-show="! vehicleInspection.lights">cancel</md-icon>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
