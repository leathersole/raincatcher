var ngModule;
try {
  ngModule = angular.module('wfm.workorder');
} catch (e) {
  ngModule = angular.module('wfm.workorder', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workorder-portal-view.tpl.html',
    '<md-list>\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <md-icon md-font-set="material-icons">bookmark</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{workorder.type}}</h3>\n' +
    '      <p>Type</p>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item class="md-2-line" ng-click="navigateTo(\'data usage\', $event)">\n' +
    '    <md-icon md-font-set="material-icons">cached</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{workflow.id}} - {{workflow.title}}</h3>\n' +
    '      <p>Workflow Id</p>\n' +
    '      <md-icon md-font-set="material-icons" class="md-secondary">keyboard_arrow_right</md-icon>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <md-icon md-font-set="material-icons">label</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{workorder.title}}</h3>\n' +
    '      <p>Title</p>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <md-icon md-font-set="material-icons">access_time</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{workorder.finishTimestamp | date:\'yyyy-MM-dd HH:mm:ss Z\'}}</h3>\n' +
    '      <p>Finish Timestamp</p>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <md-icon md-font-set="material-icons">place</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{workorder.address}}</h3>\n' +
    '      <p>Location</p>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '</md-list>\n' +
    '\n' +
    '<md-subheader>Summary</md-subheader>\n' +
    '\n' +
    '<div layout-padding layout-margin class="md-body-1">\n' +
    '  {{workorder.summary}}\n' +
    '</div>\n' +
    '');
}]);
