var ngModule;
try {
  ngModule = angular.module('wfm.message.directives');
} catch (e) {
  ngModule = angular.module('wfm.message.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/message-form.tpl.html',
    '<!--\n' +
    ' CONFIDENTIAL\n' +
    ' Copyright 2016 Red Hat, Inc. and/or its affiliates.\n' +
    ' This is unpublished proprietary source code of Red Hat.\n' +
    '-->\n' +
    '<md-toolbar class="content-toolbar md-primary">\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>New message</h3>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<form name="messageForm" ng-submit="ctrl.done(messageForm.$valid)" novalidate layout-padding layout-margin>\n' +
    '\n' +
    '  <!--\n' +
    '  <md-input-container>\n' +
    '    <label for="messageState">Status</label>\n' +
    '    <input type="text" id="inputmessageType" name="messageStatus" ng-model="ctrl.model.status" disabled="true">\n' +
    '  </md-input-container>\n' +
    '  -->\n' +
    '\n' +
    '\n' +
    '<div>\n' +
    '  <md-input-container class="md-block">\n' +
    '    <label for="To">To</label>\n' +
    '    <md-select ng-model="ctrl.model.receiver" name="receiver" id="receiver">\n' +
    '       <md-option ng-repeat="worker in ctrl.workers" value="{{worker}}">{{worker.name}} ({{worker.position}})</md-option>\n' +
    '     </md-select>\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '\n' +
    '<div>\n' +
    '  <md-input-container class="md-block">\n' +
    '    <label>Subject</label>\n' +
    '    <input type="text" id="inputSubject" name="subject" ng-model="ctrl.model.subject" required>\n' +
    '    <div ng-messages="messageForm.subject.$error" ng-if="ctrl.submitted || messageForm.subject.$dirty">\n' +
    '      <div ng-message="required">A subject is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '\n' +
    '<div>\n' +
    '  <md-input-container class="md-block" ng-class="{ \'has-error\' : messageForm.summary.$invalid && !messageForm.summary.$pristine }">\n' +
    '    <label for="inputContent">Message</label>\n' +
    '    <textarea id="inputContent" name="content" ng-model="ctrl.model.content" required md-maxlength="350"></textarea>\n' +
    '\n' +
    '    <div ng-messages="messageForm.summary.$error" ng-show="ctrl.submitted || messageForm.summary.$dirty">\n' +
    '      <div ng-message="required">A summary date is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '\n' +
    '  <md-button type="submit" class="md-raised md-primary">Send message</md-button>\n' +
    '</form>\n' +
    '');
}]);
