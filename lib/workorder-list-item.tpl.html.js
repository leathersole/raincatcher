var ngModule;
try {
  ngModule = angular.module('wfm.workorder');
} catch (e) {
  ngModule = angular.module('wfm.workorder', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workorder-list-item.tpl.html',
    '  <md-list>\n' +
    '    <md-list-item class="md-2-line" >\n' +
    '      <md-icon md-font-set="material-icons">place</md-icon>\n' +
    '      <div class="md-list-item-text">\n' +
    '        <h3>{{workorder.address}}</h3>\n' +
    '        <p>Address</p>\n' +
    '      </div>\n' +
    '    <md-divider></md-divider>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '    <md-list-item class="md-2-line" >\n' +
    '      <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
    '      <div class="md-list-item-text">\n' +
    '        <h3>{{workorder.title}}</h3>\n' +
    '        <p>Workorder</p>\n' +
    '      </div>\n' +
    '    <md-divider></md-divider>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '    <md-list-item class="md-2-line" >\n' +
    '      <md-icon md-font-set="material-icons">event</md-icon>\n' +
    '      <div class="md-list-item-text">\n' +
    '        <h3>{{workorder.finishTimestamp | date:\'yyyy-MM-dd\' }}</h3>\n' +
    '        <p>Finish Date</p>\n' +
    '      </div>\n' +
    '    <md-divider></md-divider>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '    <md-list-item class="md-2-line" >\n' +
    '      <md-icon md-font-set="material-icons">schedule</md-icon>\n' +
    '      <div class="md-list-item-text">\n' +
    '        <h3>{{workorder.finishTimestamp | date:\'HH:mm:ss Z\' }}</h3>\n' +
    '        <p>Finish Time</p>\n' +
    '      </div>\n' +
    '    <md-divider></md-divider>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '\n' +
    '<!--\n' +
    '  ===========================================================\n' +
    '  Option without labels, I\'ll keep it commented for now\n' +
    '  ===========================================================\n' +
    '\n' +
    '    <md-list-item>\n' +
    '      <md-icon md-font-set="material-icons">place</md-icon>\n' +
    '      <p>{{workorder.address}}</p>\n' +
    '      <md-divider></md-divider>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '    <md-list-item>\n' +
    '      <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
    '      <p>{{workorder.title}}</p>\n' +
    '      <md-divider></md-divider>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '    <md-list-item>\n' +
    '      <md-icon md-font-set="material-icons">schedule</md-icon>\n' +
    '      <p>{{workorder.finishTimestamp | date:\'yyyy-MM-dd\' }}</p>\n' +
    '      <md-divider></md-divider>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '    <md-list-item>\n' +
    '      <md-icon md-font-set="material-icons">event</md-icon>\n' +
    '      <p>{{workorder.finishTimestamp | date:\'HH:mm:ss Z\' }}</p>\n' +
    '      <md-divider></md-divider>\n' +
    '    </md-list-item>\n' +
    '  -->\n' +
    '\n' +
    '  </md-list>\n' +
    '\n' +
    '  <md-subheader>Work Summary</md-subheader>\n' +
    '  <p class="md-body-1" layout-padding layout-margin>Please remove damaged kerb and SUPPLY AND FIX 1X DROP KERB CENTRE BN 125 X 150 cart away from site outside number 3.</p>\n' +
    '');
}]);
