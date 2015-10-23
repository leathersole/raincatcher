'use strict';

var config = require('./config');
var ngModule = angular.module('wfm.workflow', ['wfm.core.mediator', 'ngFeedHenry'])
var _ = require('lodash');

require('./lib');

ngModule.run(function($q, $timeout, mediator, FHCloud) {
  var promise = FHCloud.get(config.apiPath).then(function(response) {
    return response;
  }, function(err) {
    console.error(err);
  }); // TODO: introduce retry/error-handling logic

  mediator.subscribe('workflows:load', function() {
    promise.then(function(workflows) {
      mediator.publish('workflows:loaded', workflows);
    });
  });

  mediator.subscribe('workflow:load', function(id) {
    promise.then(function(workflows) {
      var workflow = _.find(workflows, function(_workflow) {
        return _workflow.id == id;
      });
      mediator.publish('workflow:loaded', workflow);
    });
  });
})

ngModule.directive('workflowProgress', function($templateCache, $timeout) {
  function parseStepIndex(ctrl, stepIndex) {
    ctrl.stepIndex = stepIndex;
    ctrl.step = ctrl.steps[ctrl.stepIndex];
    if (stepIndex < 0) {
      ctrl.title = 'Workorder details';
      ctrl.name = 'Begin Workflow';
    } else if (stepIndex < ctrl.steps.length) {
      ctrl.title = 'Step' + (ctrl.stepIndex + 1);
      ctrl.name = ctrl.step.name;
    } else {
      ctrl.title = 'Workorder details';
      ctrl.name = 'Workflow Complete';
    }
  }
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/workflow-progress.tpl.html')
  , scope: {
      stepIndex: '=',
      steps: '='
    }
  , controller: function($scope) {
      var self = this;
      self.steps = $scope.steps;
      parseStepIndex(self, $scope.stepIndex ? parseInt($scope.stepIndex) : 0)

      $scope.$watch('stepIndex', function() {
        console.log('stepIndex changed')
        parseStepIndex(self, $scope.stepIndex ? parseInt($scope.stepIndex) : 0)
      });
    }
  , controllerAs: 'ctrl'
  };
})

.directive('workflowStep', function($templateRequest, $compile, mediator) {
  return {
    restrict: 'E'
  , scope: {
      step: '=' // { ..., template: "an html template to use", templatePath: "a template path to load"}
    , workorder: '='
    }
  , link: function (scope, element, attrs) {
      scope.$watch('step', function(step) {
        if (scope.step) {
          if (scope.step.formId) {
            mediator.publish('wfm:appform:form:load', scope.step.formId);
            mediator.promise('wfm:appform:form:loaded').then(function(form) {
              scope.$apply(function() {
                scope.form = form;
                element.html('<appform-mobile form="form"></appform-mobile>');
                $compile(element.contents())(scope);
              });
            })
          } else if (scope.step.templatePath) {
            $templateRequest(scope.step.templatePath).then(function(template) {
              element.html(template);
              $compile(element.contents())(scope);
            });
          } else {
            element.html(scope.step.templates.form);
            $compile(element.contents())(scope);
          };
        };
      });
    }
  , controller: function() {
      var self = this;
      self.mediator = mediator;
    }
  , controllerAs: 'ctrl'
  };
})

.directive('workflowResults', function($compile) {
  var render = function(scope, element, attrs) {
    if (scope.workflow.steps && scope.workorder) {
      element.children().remove();
      scope.workflow.steps.forEach(function(step, i) {
        element.append('<md-divider></md-divider>');
        if (scope.workorder.steps && scope.workorder.steps[step.code] && scope.workorder.steps[step.code].status === 'complete' ) {
          var template = '';
          if (step.formId) {
            var submission = scope.workorder.steps[step.code].submission;
            if (submission.submissionId || submission._submissionLocalId) {
              template = '<appform-mobile-submission-view submission-id="workorder.steps[\''+step.code+'\'].submission.submissionId" submission-local-id="workorder.steps[\''+step.code+'\'].submission._submissionLocalId"></appform-mobile-submission-view>';
            }
          } else {
            template = step.templates.view;
          };
          element.append(template);
        }
      });
      $compile(element.contents())(scope);
    };
  }
  return {
    restrict: 'E'
  , scope: {
      workorder: '=workorder'
    , workflow: '=workflow'
    }
  , link: function (scope, element, attrs) {
      render(scope, element, attrs);
    }
  };
})
;

module.exports = 'wfm.workflow';
