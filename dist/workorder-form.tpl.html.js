var ngModule;
try {
  ngModule = angular.module('wfm.workorder.directives');
} catch (e) {
  ngModule = angular.module('wfm.workorder.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workorder-form.tpl.html',
    '<!--\n' +
    ' CONFIDENTIAL\n' +
    ' Copyright 2016 Red Hat, Inc. and/or its affiliates.\n' +
    ' This is unpublished proprietary source code of Red Hat.\n' +
    '-->\n' +
    '<md-toolbar class="content-toolbar md-primary">\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>{{ctrl.model.id ? \'Update\' : \'Create\'}} work order ID {{ctrl.model.id}}</h3>\n' +
    '    <md-button class="md-icon-button" aria-label="{{ctrl.workorder.status}}">\n' +
    '      <md-tooltip>\n' +
    '        {{ctrl.workorder.status}}\n' +
    '      </md-tooltip>\n' +
    '      <workorder-status status="ctrl.workorder.status"></workorder-status>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<form name="workorderForm" ng-submit="ctrl.done(workorderForm.$valid)" novalidate layout-padding layout-margin>\n' +
    '\n' +
    '  <!--\n' +
    '  <md-input-container>\n' +
    '    <label for="workorderState">Status</label>\n' +
    '    <input type="text" id="inputWorkorderType" name="workorderStatus" ng-model="ctrl.model.status" disabled="true">\n' +
    '  </md-input-container>\n' +
    '  -->\n' +
    '\n' +
    '\n' +
    '  <md-input-container>\n' +
    '    <label for="workorderType">Type</label>\n' +
    '    <md-select ng-model="ctrl.model.type" name="workorderType" id="workorderType">\n' +
    '       <md-option value="Job Order">Job Order</md-option>\n' +
    '       <md-option value="Type 02">Type 02</md-option>\n' +
    '       <md-option value="Type 03">Type 03</md-option>\n' +
    '       <md-option value="Type 04">Type 04</md-option>\n' +
    '     </md-select>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container>\n' +
    '    <label for="workflow">Workflow</label>\n' +
    '    <md-select ng-model="ctrl.model.workflowId" name="workflow" id="workflow">\n' +
    '       <md-option ng-repeat="workflow in ctrl.workflows" value="{{workflow.id}}">{{workflow.id}} - {{workflow.title}}</md-option>\n' +
    '     </md-select>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container>\n' +
    '    <label for="assignee">Assignee</label>\n' +
    '    <md-select ng-model="ctrl.model.assignee" name="assignee" id="assignee">\n' +
    '       <md-option ng-repeat="worker in ctrl.workers" value="{{worker.id}}">{{worker.name}} ({{worker.position}})</md-option>\n' +
    '     </md-select>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container>\n' +
    '    <label>Title</label>\n' +
    '    <input type="text" id="inputTitle" name="title" ng-model="ctrl.model.title" required>\n' +
    '    <div ng-messages="workorderForm.title.$error" ng-show="ctrl.submitted || workorderForm.title.$dirty">\n' +
    '      <div ng-message="required">A title is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container>\n' +
    '    <label for="inputAddress">Address</label>\n' +
    '    <input type="text"  id="inputAddress" name="address" ng-model="ctrl.model.address" required>\n' +
    '    <div ng-messages="workorderForm.address.$error" ng-show="ctrl.submitted || workorderForm.address.$dirty">\n' +
    '      <div ng-message="required">An address is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container>\n' +
    '    <label for="inputAddress">Lattitude</label>\n' +
    '    <input type="text"  id="inputLattitude" name="lattitude" ng-model="ctrl.model.location[0]" required>\n' +
    '    <div ng-messages="workorderForm.lattitude.$error" ng-show="ctrl.submitted || workorderForm.lattitude.$dirty">\n' +
    '      <div ng-message="required">An lattitude is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container>\n' +
    '    <label for="inputAddress">Longitude</label>\n' +
    '    <input type="text"  id="inputLattitude" name="longitude" ng-model="ctrl.model.location[1]" required>\n' +
    '    <div ng-messages="workorderForm.longitude.$error" ng-show="ctrl.submitted || workorderForm.longitude.$dirty">\n' +
    '      <div ng-message="required">An longitude is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container>\n' +
    '    <label for="inputFinishDate">Finish Date</label>\n' +
    '    <input type="date"  id="inputFinishDate" name="finishDate" ng-model="ctrl.model.finishDate" required>\n' +
    '    <div ng-messages="workorderForm.finishDate.$error" ng-show="ctrl.submitted || workorderForm.finishDate.$dirty">\n' +
    '      <div ng-message="required">A finish date is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container>\n' +
    '    <label for="inputFinishTime" >Finish Time</label>\n' +
    '    <input type="time"  id="inputFinishTime" name="finishTime" ng-model="ctrl.model.finishTime" required>\n' +
    '    <div ng-messages="workorderForm.finishTime.$error" ng-show="ctrl.submitted || workorderForm.finishTime.$dirty">\n' +
    '      <div ng-message="required">A finish time is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container ng-class="{ \'has-error\' : workorderForm.summary.$invalid && !workorderForm.summary.$pristine }">\n' +
    '    <label for="inputSummary">Summary</label>\n' +
    '    <textarea  id="inputSummary" name="summary" ng-model="ctrl.model.summary" required md-maxlength="150"></textarea>\n' +
    '\n' +
    '    <div ng-messages="workorderForm.summary.$error" ng-show="ctrl.submitted || workorderForm.summary.$dirty">\n' +
    '      <div ng-message="required">A summary date is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '\n' +
    '  <md-button type="submit" class="md-raised md-primary">{{ctrl.model.id ? \'Update\' : \'Create\'}} Workorder</md-button>\n' +
    '</form>\n' +
    '');
}]);
