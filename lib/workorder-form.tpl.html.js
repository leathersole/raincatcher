var ngModule;
try {
  ngModule = angular.module('wfm.workorder');
} catch (e) {
  ngModule = angular.module('wfm.workorder', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workorder-form.tpl.html',
    '\n' +
    '<md-toolbar class="content-toolbar md-primary">\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>Edit work order ID {{ctrl.model.id}}</h3> \n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '\n' +
    '<form name="workorderForm" ng-submit="ctrl.done(workorderForm.$valid)" novalidate layout-padding layout-margin>\n' +
    '  \n' +
    '  <!--\n' +
    '  <md-input-container>\n' +
    '    <label for="workorderState">Status</label>\n' +
    '    <input type="text" id="inputWorkorderType" name="workorderStatus" ng-model="ctrl.model.status" disabled="true">\n' +
    '  </md-input-container>\n' +
    '  -->\n' +
    '  \n' +
    '  <md-input-container>\n' +
    '    <label for="workorderType">Type</label>\n' +
    '    <md-select ng-model="ctrl.userState" placeholder="Job Order" id="workorderType">\n' +
    '       <md-option value="Type 01">Job Order</md-option>\n' +
    '       <md-option value="Type 02">Type 02</md-option>\n' +
    '       <md-option value="Type 03">Type 03</md-option>\n' +
    '       <md-option value="Type 04">Type 04</md-option>\n' +
    '     </md-select>\n' +
    '    <!--    \n' +
    '    <input type="text"  id="inputWorkorderType" name="workorderType" ng-model="ctrl.model.type" disabled="true">\n' +
    '    -->  \n' +
    '  </md-input-container>\n' +
    '  <md-input-container ng-class="{ \'has-error\' : workorderForm.title.$invalid && !workorderForm.title.$pristine }">\n' +
    '    <label for="inputTitle">Title</label>\n' +
    '    <input type="text" id="inputTitle" name="title" placeholder="Title" ng-model="ctrl.model.title" required>\n' +
    '    <p ng-show="workorderForm.title.$invalid && !workorderForm.title.$pristine">A title is required.</p>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container ng-class="{ \'has-error\' : workorderForm.address.$invalid && !workorderForm.address.$pristine }">\n' +
    '    <label for="inputAddress">Address</label>\n' +
    '    <input type="text"  id="inputAddress" name="address" placeholder="Address" ng-model="ctrl.model.address" required>\n' +
    '    <p ng-show="addressForm.address.$invalid && !addressForm.address.$pristine" class="help-block">An address is required.</p>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container ng-class="{ \'has-error\' : workorderForm.finishDate.$invalid && !workorderForm.finishDate.$pristine }">\n' +
    '    <label for="inputFinishDate" >Finish Date</label>\n' +
    '    <input type="date"  id="inputFinishDate" name="finishDate" ng-model="ctrl.model.finishDate" required>\n' +
    '    <p ng-show="workorderForm.finishDate.$invalid && !workorderForm.finishDate.$pristine" class="help-block">A finish date is required.</p>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container ng-class="{ \'has-error\' : workorderForm.finishTime.$invalid && !workorderForm.finishTime.$pristine }">\n' +
    '    <label for="inputFinishTime" >Finish Time</label>\n' +
    '    <input type="time"  id="inputFinishTime" name="finishTime" ng-model="ctrl.model.finishTime" required>\n' +
    '    <p ng-show="workorderForm.finishTime.$invalid && !workorderForm.finishTime.$pristine" class="help-block">A finish time is required.</p>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container ng-class="{ \'has-error\' : workorderForm.summary.$invalid && !workorderForm.summary.$pristine }">\n' +
    '    <label for="inputSummary" >City</label>\n' +
    '    <textarea  id="inputSummary" name="summary" placeholder="Summary" ng-model="ctrl.model.summary" required md-maxlength="150"></textarea>\n' +
    '    \n' +
    '    <p ng-show="workorderForm.city.$invalid && !workorderForm.city.$pristine" class="help-block">A summary is required.</p>\n' +
    '  </md-input-container>\n' +
    '\n' +
    '  <md-button type="submit" class="md-raised md-primary" ng-disabled="workorderForm.$invalid">Edit Workorder</md-button>\n' +
    '</form>\n' +
    '');
}]);
