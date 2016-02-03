var ngModule;
try {
  ngModule = angular.module('wfm.message.directives');
} catch (e) {
  ngModule = angular.module('wfm.message.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/message-list.tpl.html',
    '<md-toolbar>\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>\n' +
    '      <span>Messages</span>\n' +
    '    </h3>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<form action="#" class="persistent-search">\n' +
    '  <label for="search"><i class="material-icons">search</i></label>\n' +
    '  <input type="text" id="search" placeholder="Search">\n' +
    '</form>\n' +
    '\n' +
    '\n' +
    '<div class="messages">\n' +
    '\n' +
    '  <md-list>\n' +
    '    <md-list-item class="md-3-line new" ng-repeat="message in list" ng-click="ctrl.selectMessage($event, message)" ng-class="{active: ctrl.selectedMessageId === message.id}">\n' +
    '      <img ng-src="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg" class="md-avatar" alt="Daisy" />\n' +
    '      <div class="md-list-item-text" layout="column">\n' +
    '        <span class="md-caption time-stamp">13 mins ago</span>\n' +
    '        <h3>Trever Worke</h3>\n' +
    '        <h4>{{message.subject}}</h4>\n' +
    '        <p>{{message.content}}</p>\n' +
    '      </div>\n' +
    '      <md-divider md-inset></md-divider>\n' +
    '    </md-list-item>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '  </md-list>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '<md-list>\n' +
    '  <md-list-item class="md-2-line" ng-click="navigateTo(\'app.message.detail\', {messageId: message.id})" ng-repeat="message in ctrl.messages">\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{user.title}}</h3>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '</md-list>');
}]);
