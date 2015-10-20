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
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons">local_gas_station</md-icon>\n' +
    '      Fuel\n' +
    '      <md-radio-group ng-model="ctrl.model.fuel">\n' +
    '        <md-radio-button style="display: inline" ng-value="false" aria-label="Fail">Fail</md-radio-button>\n' +
    '        <md-radio-button style="display: inline" ng-value="true" aria-label="Pass">Pass</md-radio-button>\n' +
    '      </md-radio-group>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item>\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons">album</md-icon>\n' +
    '      Tires\n' +
    '      <md-radio-group ng-model="ctrl.model.tires">\n' +
    '        <md-radio-button style="display: inline" ng-value="false" aria-label="Fail">Fail</md-radio-button>\n' +
    '        <md-radio-button style="display: inline" ng-value="true" aria-label="Pass">Pass</md-radio-button>\n' +
    '      </md-radio-group>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item>\n' +
    '    <button class="button button-positive button-full" ng-click="ctrl.done()">Submit</button>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
