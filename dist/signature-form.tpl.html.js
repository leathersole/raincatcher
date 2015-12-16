var ngModule;
try {
  ngModule = angular.module('wfm.component.signature');
} catch (e) {
  ngModule = angular.module('wfm.component.signature', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/signature-form.tpl.html',
    '<div class="signature-form">\n' +
    '  <canvas tabindex="0"></canvas>\n' +
    '</div>\n' +
    '');
}]);
