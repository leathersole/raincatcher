var ngModule;
try {
  ngModule = angular.module('wfm.risk-assessment');
} catch (e) {
  ngModule = angular.module('wfm.risk-assessment', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/risk-assessment-form.tpl.html',
    '<!--\n' +
    '  <ion-item class="risk-assessment">\n' +
    ' -->\n' +
    '  \n' +
    '  <div layout="row" ng-show="riskAssessmentStep === 0" layout-margin layout-padding class="risk-assesssment">\n' +
    '<!-- \n' +
    '  <i class="icon ion-alert-circled"></i>\n' +
    '      <md-icon md-font-set="material-icons">place</md-icon>\n' +
    '  -->\n' +
    '      <h2 class="md-title">Risk assessment complete?</h2>\n' +
    '      <p class="md-body-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p> \n' +
    '        \n' +
    '      <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n' +
    '     \n' +
    '     <!--   \n' +
    '      <md-button class="md-raised md-primary" ng-click="ctrl.answerComplete($event, true)">Yes</md-button>\n' +
    '      <md-button class="md-raised md-warn" ng-click="ctrl.answerComplete($event, false)">No</md-button>\n' +
    '    -->\n' +
    '    \n' +
    '    <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '      <md-button class="md-primary md-warn" ng-click="ctrl.answerComplete($event, true)">No</md-button>\n' +
    '      <md-button class="md-primary" ng-click="ctrl.answerComplete($event, true)">Yes</md-button>\n' +
    '    </div><!-- workflow-actions-->\n' +
    '    \n' +
    '    \n' +
    '  </div>\n' +
    '  \n' +
    '  <div layout="row" ng-if="riskAssessmentStep == 1" layout-margin layout-padding>\n' +
    '    <h3 class="md-title">Signature</h3>\n' +
    '    <p class="md-caption">Draw your signature inside the square</p>\n' +
    '    <risk-assessment-signature></risk-assessment-signature>\n' +
    '\n' +
    '    <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '      <md-button class="md-primary md-hue-1">Back</md-button>\n' +
    '      <md-button class="md-primary" ng-click="ctrl.done($event)">Continue</md-button>\n' +
    '    </div><!-- workflow-actions-->\n' +
    '  </div>\n' +
    '\n' +
    '  \n' +
    '  \n' +
    '  \n' +
    '  \n' +
    '<!--\n' +
    '</ion-item>\n' +
    '-->');
}]);
