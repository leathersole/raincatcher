var ngModule;
try {
  ngModule = angular.module('wfm.analytics.directives');
} catch (e) {
  ngModule = angular.module('wfm.analytics.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/pie.tpl.html',
    '<div flex>\n' +
    '  <md-card>\n' +
    '    <div id="pie-chart"></div>\n' +
    '    <md-card-content>\n' +
    '      <h2 class="md-title">Workorders by assignee</h2>\n' +
    '      <p>\n' +
    '        This pie chart represents the number of workorders assigned to each worker.\n' +
    '      </p>\n' +
    '    </md-card-content>\n' +
    '  </md-card>\n' +
    '</div>\n' +
    '');
}]);
