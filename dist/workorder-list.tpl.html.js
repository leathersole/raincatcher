/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
var ngModule;
try {
  ngModule = angular.module('wfm.workorder.directives');
} catch (e) {
  ngModule = angular.module('wfm.workorder.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workorder-list.tpl.html',
    '<md-toolbar>\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>\n' +
    '      <span>Workorders</span>\n' +
    '    </h3>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<md-list>\n' +
    '  <md-list-item ng-repeat="workorder in list" ng-click="ctrl.selectWorkorder($event, workorder)" class="md-3-line workorder-item" ng-class="{active: ctrl.selectedWorkorderId === workorder.id}" >\n' +
    '\n' +
    '<!--\n' +
    '  TODO: change class name according to the color:\n' +
    '    "success" = green\n' +
    '    danger = "red"\n' +
    '    warning = "yellow"\n' +
    '    no class = grey\n' +
    '  -->\n' +
    '  <workorder-status class="" status="workorder.status"></workorder-status>\n' +
    '\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>\n' +
    '        {{workorder.type}} -\n' +
    '        <span ng-if="workorder.id">{{workorder.id}}</span>\n' +
    '        <span ng-if="! workorder.id" style="font-style: italic;">&lt;local&gt;</span>\n' +
    '      </h3>\n' +
    '      <h4>{{workorder.title}}</h4>\n' +
    '      <p>{{workorder.address}}</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
