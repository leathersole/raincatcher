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
    '    <md-icon md-font-set="material-icons">local_gas_station</md-icon>\n' +
    '    Fuel\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons" ng-show="vehicleInspection.fuel">check_circle</md-icon>\n' +
    '      <md-icon md-font-set="material-icons" ng-show="! vehicleInspection.fuel">cancel</md-icon>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item>\n' +
    '    <md-icon md-font-set="material-icons">album</md-icon>\n' +
    '    Tires\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons" ng-show="vehicleInspection.tires">check_circle</md-icon>\n' +
    '      <md-icon md-font-set="material-icons" ng-show="! vehicleInspection.tires">cancel</md-icon>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
