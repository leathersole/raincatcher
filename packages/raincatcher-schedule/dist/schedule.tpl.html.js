var ngModule;
try {
  ngModule = angular.module('wfm.schedule.directives');
} catch (e) {
  ngModule = angular.module('wfm.schedule.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/schedule.tpl.html',
    '<md-toolbar class="wfm-scheduler-toolbar">\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>\n' +
    '      <span>Scheduler</span>\n' +
    '    </h3>\n' +
    '\n' +
    '    <span flex></span>\n' +
    '    <md-datepicker ng-model="ctrl.scheduleDate" md-placeholder="Enter date" ng-change="ctrl.dateChange()"></md-datepicker>\n' +
    '    <!--\n' +
    '    <md-button class="md-icon-button" aria-label="Favorite">\n' +
    '    <md-icon md-font-set="material-icons">date_range</md-icon>\n' +
    '  </md-button>\n' +
    '-->\n' +
    '</div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<div layout="row">\n' +
    '  <div flex="70">\n' +
    '\n' +
    '    <table class="wfm-scheduler">\n' +
    '      <col width="30">\n' +
    '      <col width="70">\n' +
    '      <tr>\n' +
    '        <td class="wfm-scheduler-worker">\n' +
    '          <div class="wfm-toolbar-sm">\n' +
    '            <h3 class="md-subhead">\n' +
    '              Workers\n' +
    '            </h3>\n' +
    '          </div>\n' +
    '          <md-list>\n' +
    '            <md-list-item ng-repeat="worker in ctrl.workers">\n' +
    '              <img alt="Name" ng-src="{{worker.avatar}}" class="md-avatar" />\n' +
    '              <p>{{worker.name}}</p>\n' +
    '            </md-list-item>\n' +
    '          </md-list>\n' +
    '        </td>\n' +
    '        <td class="wfm-scheduler-calendar">\n' +
    '          <table>\n' +
    '            <tr><th ng-repeat="hour in [\'7am\', \'8am\', \'9am\', \'10am\', \'11am\', \'12pm\', \'1pm\', \'2pm\', \'3pm\', \'4pm\', \'5pm\', \'6pm\', \'7pm\']">{{hour}}</th></tr>\n' +
    '            <tr ng-repeat="worker in ctrl.workers">\n' +
    '              <td ng-repeat="hour in [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]" droppable="true" data-hour="{{hour}}" data-workerId="{{worker.id}}"></td>\n' +
    '            </tr>\n' +
    '          </table>\n' +
    '          <div class="wfm-scheduler-scheduled"></div>\n' +
    '        </td>\n' +
    '      </tr>\n' +
    '    </table>\n' +
    '  </div>\n' +
    '\n' +
    '  <div flex="30" class="wfm-scheduler-unscheduled" id="workorders-list" droppable="true">\n' +
    '    <div class="wfm-toolbar-sm">\n' +
    '      <h3 class="md-subhead">\n' +
    '        Workorders\n' +
    '      </h3>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
