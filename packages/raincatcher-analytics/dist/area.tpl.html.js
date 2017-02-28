var ngModule;
try {
  ngModule = angular.module('wfm.analytics.directives');
} catch (e) {
  ngModule = angular.module('wfm.analytics.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/area.tpl.html',
    '<div flex hide-sm>\n' +
    '    <md-card>\n' +
    '      <div id="area-chart"></div>\n' +
    '      <md-card-content>\n' +
    '        <h2 class="md-title">Area Chart</h2>\n' +
    '        <p>\n' +
    '          This area chart compares the estimated workorder time <br>completion time with\n' +
    '          the real completion time.\n' +
    '        </p>\n' +
    '      </md-card-content>\n' +
    '    </md-card>\n' +
    '  </div>\n' +
    '');
}]);
