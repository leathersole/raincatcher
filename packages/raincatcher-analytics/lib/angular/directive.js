'use strict';

var _ = require("lodash");
var ngModule = angular.module('wfm.analytics.directives', ['wfm.core.mediator']);
module.exports = 'wfm.analytics.directives';

require('../../dist');
var c3 = require('c3');

ngModule.directive('analyticsPiechart', function($templateCache) {
  return {
    restrict: 'E',
    template: $templateCache.get('wfm-template/pie.tpl.html'),
    scope: {
      workers: '=',
      workorders: '='
    },
    link: function() {
    },
    controller: function($scope) {
      var workerMap = {};
      $scope.workers.forEach(function(worker) {
        workerMap[worker.id] = worker;
      });

      var workorderCounts = {};
      $scope.workorders.forEach(function(workorder) {
        workorderCounts[workorder.assignee] = workorderCounts[workorder.assignee] || 0;
        workorderCounts[workorder.assignee]++;
      });

      var columns = [];
      _.forIn(workorderCounts, function(count, workerid) {
        var worker = workerMap[workerid];
        var name = worker ? worker.name : 'Unassigned';
        var column = [name, count];
        columns.push(column);
      });


      c3.generate({
        bindto: '#pie-chart',
        size: {
          width: 450
        },
        data: {
          columns: columns,
          type : 'pie',
          onclick: function(d, i) {
            console.log("onclick", d, i);
          },
          onmouseover: function(d, i) {
            console.log("onmouseover", d, i);
          },
          onmouseout: function(d, i) {
            console.log("onmouseout", d, i);
          }
        }
      });
    },
    controllerAs: 'ctrl'
  };})
  .directive('analyticsBarchart', function($templateCache) {
    return {
      restrict: 'E',
      template: $templateCache.get('wfm-template/chart.tpl.html'),
      scope: {
        workorders: '='
      },
      link: function() {
      },
      controller: function($scope) {
        //add fake data for bar charts
        var columnEstimated = ["estimated"];
        var columnReal = ["real"];
        var xAxis = [];
        $scope.workorders.forEach(function(workorder) {
          var estimated  = Math.floor((Math.random() * 10) + 15);
          var real = Math.floor((Math.random() * 10) + 15);
          xAxis.push("#" + workorder.id + ":" + workorder.title);
          columnEstimated.push(estimated);
          columnReal.push(real);
        });

        c3.generate({
          bindto: '#bar-chart',
          size: {
            width: 450
          },
          data: {
            columns: [
              columnEstimated,
              columnReal
            ],
            type: 'bar'
          },
          axis: {
            x: {
              show: false,
              type: 'category',
              categories: xAxis
            }
          },
          bar: {
            width: {
              ratio: .8
            }
          }
        });


      },
      controllerAs: 'ctrl'
    };})
  .directive('analyticsAreachart', function($templateCache) {
    return {
      restrict: 'E',
      template: $templateCache.get('wfm-template/area.tpl.html'),
      scope: {
        workorders: '='
      },
      link: function() {
      },
      controller: function($scope) {
        //add fake data for bar charts
        var columnEstimated = ["estimated"];
        var columnReal = ["real"];
        var xAxis = [];
        $scope.workorders.forEach(function(workorder) {
          var estimated  = Math.floor((Math.random() * 10) + 15);
          var real = Math.floor((Math.random() * 10) + 15);
          xAxis.push("#" + workorder.id + ":" + workorder.title);
          columnEstimated.push(estimated);
          columnReal.push(real);
        });

        c3.generate({
          bindto: '#area-chart',
          size: {
            width: 450
          },
          data: {
            columns: [
              columnEstimated,
              columnReal
            ],
            types: {
              estimated: 'area',
              real: 'area-spline'
            }
          }
        });


      },
      controllerAs: 'ctrl'
    };});
