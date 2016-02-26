var ngModule;
try {
  ngModule = angular.module('wfm.workorder.directives');
} catch (e) {
  ngModule = angular.module('wfm.workorder.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workorder-list.tpl.html',
    '<!--\n' +
    ' CONFIDENTIAL\n' +
    ' Copyright 2016 Red Hat, Inc. and/or its affiliates.\n' +
    ' This is unpublished proprietary source code of Red Hat.\n' +
    '-->\n' +
    '<md-toolbar>\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>\n' +
    '      <span>Workorders</span>\n' +
    '    </h3>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<form action="#" class="persistent-search">\n' +
    '  <label for="search"><i class="material-icons">search</i></label>\n' +
    '  <input type="text" id="search" placeholder="Search">\n' +
    '</form>\n' +
    '\n' +
    '<md-list>\n' +
    '  <md-list-item ng-repeat="workorder in ctrl.list" ng-click="ctrl.selectWorkorder($event, workorder)" class="md-3-line workorder-item" ng-class="{active: ctrl.selected.id === workorder.id}" >\n' +
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
