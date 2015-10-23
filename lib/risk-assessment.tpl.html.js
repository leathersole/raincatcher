var ngModule;
try {
  ngModule = angular.module('wfm.risk-assessment');
} catch (e) {
  ngModule = angular.module('wfm.risk-assessment', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/risk-assessment.tpl.html',
    '<md-list class="risk-assessment">\n' +
    '  <md-list-item>\n' +
    '    <md-subheader class="md-no-sticky"><h3>Risk Assessment</h3></md-subheader>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item>\n' +
    '    Risk Assessment complete\n' +
    '    <md-icon md-font-set="material-icons" ng-show="riskAssessment.complete">check_circle</md-icon>\n' +
    '    <md-icon md-font-set="material-icons" ng-show="! riskAssessment.complete">cancel</md-icon>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item layout="column">\n' +
    '    <md-subheader class="md-no-sticky">Signature:</md-subheader>\n' +
    '    <img src="{{riskAssessment.signature}}"></img>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
