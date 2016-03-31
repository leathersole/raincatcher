/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var ngModule = angular.module('wfm.map.directives', ['wfm.core.mediator']);
module.exports = 'wfm.map.directives';

require('../../dist');

ngModule.directive('workorderMap', function($templateCache, mediator, $window, $document, $timeout) {
  function initMap(element, center) {
    var myOptions = {
      zoom:14,
      center:new google.maps.LatLng(center[0], center[1]),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(element[0].querySelector('#gmap_canvas'), myOptions);
    return map;
  };

  function resizeMap(element, parent) {
    var mapElement = element[0].querySelector('#gmap_canvas')
    var height = parent.clientHeight;
    var width = parent.clientWidth;
    mapElement.style.height = height + 'px';
    mapElement.style.width = width + 'px';

    console.log('Map dimensions:', width, height);
    google.maps.event.trigger(mapElement, 'resize');
  };

  function addMarkers(map, element, workorders) {
    workorders.forEach(function(workorder) {
      if (workorder.location) {
        // var lat = center[0] + (Math.random() - 0.5) * 0.05;
        // var long = center[1] + (Math.random() - 0.5) * 0.2;
        var lat = workorder.location[0];
        var long = workorder.location[1];
        var marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(lat, long)});
        var infowindow = new google.maps.InfoWindow({content:'<strong>Workorder #'+workorder.id+'</strong><br>Vancouver, BC<br>'});
        google.maps.event.addListener(marker, 'click', function(){
          infowindow.open(map,marker);
        });
      }
    });
  };

  function findParent(document, element, selector) {
    if (!selector) {
      return element.parentElement;
    }
    var matches = document.querySelectorAll(selector);
    var parent = element.parentElement;
    while(parent) {
      var isParentMatch = Array.prototype.some.call(matches, function(_match) {
        return parent === _match;
      });
      if (isParentMatch) {
        break;
      };
      var parent = parent.parentElement;
      console.log('parent', parent)
    }
    return parent || element.parentElement;
  }

  return {
    restrict: 'E',
    template: $templateCache.get('wfm-template/workorder-map.tpl.html'),
    scope: {
      list: '=',
      center: '=',
      workorders: '=',
      containerSelector: '@'
    },
    link: function (scope, element, attrs, ctrl) {
      var map = initMap(element, scope.center || [49.27, -123.08]);
      addMarkers(map, element, scope.workorders);
      var parent = findParent($document[0], element[0], scope.containerSelector);
      var resizeListener = function() {
        resizeMap(element, parent);
      }
      $timeout(resizeListener);
      angular.element($window).on('resize', resizeListener); // TODO: throttle this
      scope.$on('$destroy', function() {
        angular.element($window).off('resize', resizeListener);
      });
    },
    controller: function($scope, $window, $element) {

    },
    controllerAs: 'ctrl'
  };
})
