'use strict';

module.exports = 'wfm.push.service';

angular.module('wfm.push.service', [])

.factory('pushClient', function() {
  var pushClient = {};
  var handlers = [];

  var primaryHandler = function(e) {
    handlers[e.message.topic].call();
  };

  var registerSuccess = function() {
    //
  };

  var registerfails = function() {
    //
  };

  pushClient.register = function(alias) {
    $fh.push(primaryHandler, registerSuccess, registerfails, {alias:alias});
  };

  pushClient.addTopic = function(topic, handler) {
    handlers[topic] = handler;
  };

  return pushClient;
})
;
