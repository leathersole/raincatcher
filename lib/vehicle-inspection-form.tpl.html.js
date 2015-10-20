var ngModule;
try {
  ngModule = angular.module('wfm.workorder');
} catch (e) {
  ngModule = angular.module('wfm.workorder', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/vehicle-inspection-form.tpl.html',
    '<md-list class="vehicle-inspection">\n' +
    '  <md-list-item>\n' +
    '    <md-switch ng-model="ctrl.model.fuel">\n' +
    '      <md-icon md-font-set="material-icons">local_gas_station</md-icon>\n' +
    '      Fuel\n' +
    '    </md-switch>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item>\n' +
    '    <md-switch ng-model="ctrl.model.tires">\n' +
    '      <md-icon md-font-set="material-icons">album</md-icon>\n' +
    '      Tires\n' +
    '    </md-switch>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item>\n' +
    '    <button class="button button-positive button-full" ng-click="ctrl.done()">Submit</button>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
