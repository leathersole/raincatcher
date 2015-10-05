var ngModule;
try {
  ngModule = angular.module('wfm.workorder');
} catch (e) {
  ngModule = angular.module('wfm.workorder', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workorder-portal-list.tpl.html',
    '<md-list class="jobs-list">\n' +
    '  <md-list-item ng-click="goToPerson()" class="list-header">\n' +
    '    <p>Workorders</p>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item ng-repeat="workorder in list" ng-click="ctrl.selectWorkorder($event, workorder)" class="md-3-line" >\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{workorder.type}} - {{workorder.id}}</h3>\n' +
    '      <h4>{{workorder.title}}</h4>\n' +
    '      <p>{{workorder.address}}</p>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
