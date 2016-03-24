var ngModule;
try {
  ngModule = angular.module('wfm.analytics.directives');
} catch (e) {
  ngModule = angular.module('wfm.analytics.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/chart.tpl.html',
    '<div flex>\n' +
    '  <md-card>\n' +
    '    <div id="bar-chart"></div>\n' +
    '    <md-card-content>\n' +
    '      <h2 class="md-title">Completion time / Estimated time</h2>\n' +
    '      <p>\n' +
    '        This bar chart compares the estimated workorder time <br>completion time with\n' +
    '        the real completion time.\n' +
    '      </p>\n' +
    '    </md-card-content>\n' +
    '  </md-card>\n' +
    '</div>\n' +
    '');
}]);
