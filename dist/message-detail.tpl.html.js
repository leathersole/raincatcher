var ngModule;
try {
  ngModule = angular.module('wfm.message.directives');
} catch (e) {
  ngModule = angular.module('wfm.message.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/message-detail.tpl.html',
    '<!--\n' +
    ' CONFIDENTIAL\n' +
    ' Copyright 2016 Red Hat, Inc. and/or its affiliates.\n' +
    ' This is unpublished proprietary source code of Red Hat.\n' +
    '-->\n' +
    '<md-toolbar class="content-toolbar">\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>\n' +
    '      Subject of the message goes here\n' +
    '    </h3>\n' +
    '    <span flex></span>\n' +
    '    <md-button class="md-icon-button" aria-label="Edit" ui-sref="app.message.edit({messageId: ctrl.message.id})">\n' +
    '      <md-icon md-font-set="material-icons">delete</md-icon>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<!--\n' +
    '<md-button class="md-fab" aria-label="New Message" ui-sref="app.message.new">\n' +
    '  <md-icon md-font-set="material-icons">add</md-icon>\n' +
    '</md-button>\n' +
    '-->\n' +
    '\n' +
    '<md-button class="md-fab" aria-label="New Message">\n' +
    '  <md-icon md-font-set="material-icons">edit</md-icon>\n' +
    '  <md-tooltip md-visible="demo.showTooltip" md-direction="left">\n' +
    '    New Message\n' +
    '  </md-tooltip>\n' +
    '</md-button>\n' +
    '\n' +
    '<!--\n' +
    ' <md-tabs md-dynamic-height md-border-bottom>\n' +
    '  <md-tab label="Information">\n' +
    '    <md-content>\n' +
    '      <div class="user-info-header" ng-style="ctrl.style">\n' +
    '        <h1 class="md-display-1">{{ctrl.message.title}}</h1>\n' +
    '      </div>\n' +
    '    </md-content>\n' +
    '  </md-tab>\n' +
    '</md-tabs>\n' +
    '-->\n' +
    '\n' +
    '\n' +
    '<div class="message" layout-padding layout-margin>\n' +
    '\n' +
    '  <div class="message-header">\n' +
    '    <div class="md-body-1">\n' +
    '      <span>To:</span> Chip of Trever <!-- try to add a chip, if its too hard lets just use the name -->\n' +
    '    </div>\n' +
    '    <div class="md-body-1 time-stamp">11:38 AM (3 hours ago)</div>\n' +
    '  </div>\n' +
    '\n' +
    '  <md-divider></md-divider>\n' +
    '\n' +
    '  <p class="md-body-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n' +
    '\n' +
    '</div>');
}]);
