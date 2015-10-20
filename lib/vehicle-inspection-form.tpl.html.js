var ngModule;
try {
  ngModule = angular.module('wfm.workorder');
} catch (e) {
  ngModule = angular.module('wfm.workorder', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/vehicle-inspection-form.tpl.html',
    '<md-grid-list class="vehicle-inspection" md-cols="3" md-row-height="1.5rem">\n' +
    '  <md-grid-tile md-rowspan="2">\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons">local_gas_station</md-icon>\n' +
    '      Fuel\n' +
    '    </div>\n' +
    '  </md-grid-tile>\n' +
    '  <md-grid-tile>Empty</md-grid-tile>\n' +
    '  <md-grid-tile>Full</md-grid-tile>\n' +
    '  <md-grid-tile md-colspan="2">\n' +
    '    <md-radio-group ng-model="ctrl.model.fuel" class="fuel">\n' +
    '      <md-radio-button value="0%" aria-label="0%"></md-radio-button>\n' +
    '      <md-radio-button value="25%" aria-label="25%"></md-radio-button>\n' +
    '      <md-radio-button value="50%" aria-label="50%"></md-radio-button>\n' +
    '      <md-radio-button value="75%" aria-label="75%"></md-radio-button>\n' +
    '      <md-radio-button value="100%" aria-label="100%"></md-radio-button>\n' +
    '    </md-radio-group>\n' +
    '  </md-grid-tile>\n' +
    '\n' +
    '  <md-grid-tile md-rowspan="2">\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons">album</md-icon>\n' +
    '      Tires\n' +
    '    </div>\n' +
    '  </md-grid-tile>\n' +
    '  <md-grid-tile md-rowspan="2" md-colspan="2">\n' +
    '    <md-radio-group ng-model="ctrl.model.tires">\n' +
    '      <md-radio-button ng-value="false" aria-label="Fail">Fail</md-radio-button>\n' +
    '      <md-radio-button ng-value="true" aria-label="Pass">Pass</md-radio-button>\n' +
    '    </md-radio-group>\n' +
    '  </md-grid-tile>\n' +
    '\n' +
    '  <md-grid-tile md-rowspan="2">\n' +
    '    <div>\n' +
    '      <md-icon md-font-set="material-icons">brightness_low</md-icon>\n' +
    '      Lights\n' +
    '    </div>\n' +
    '  </md-grid-tile>\n' +
    '  <md-grid-tile md-rowspan="2" md-colspan="2">\n' +
    '    <md-radio-group ng-model="ctrl.model.lights">\n' +
    '      <md-radio-button ng-value="false" aria-label="Fail">Fail</md-radio-button>\n' +
    '      <md-radio-button ng-value="true" aria-label="Pass">Pass</md-radio-button>\n' +
    '    </md-radio-group>\n' +
    '  </md-grid-tile>\n' +
    '\n' +
    '  <md-grid-tile md-colspan="3" md-rowspan="2">\n' +
    '    <md-button ng-click="ctrl.done()" class="md-raised md-primary">Submit</md-button>\n' +
    '  </md-grid-tile>\n' +
    '</md-grid-list>\n' +
    '');
}]);
