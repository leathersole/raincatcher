'use strict';

var _ = require('lodash');
var Mediator = require('mediator-js').Mediator;
var q = require('q');

var mediator = new Mediator();

mediator.promise = function(topic) {
  var deferred = q.defer();
  mediator.once(topic, function(data) {
    deferred.resolve(data);
  });
  return deferred.promise;
}

mediator.request = function(topic, parameter, options) {
  var topics = {}, subs = {}, complete = false, timeout;
  var deferred = q.defer();
  options = options || {};

  topics.request = topic;
  topics.done = options.doneTopic || 'done:' + topic;
  topics.error = options.errorTopic || 'error:' + topic;

  options.uid = options.uid || parameter;

  if (options.uid) {
     topics.done += ':' + options.uid;
     topics.error += ':' + options.uid;
  }

  if (!options.timeout) {
    options.timeout = 2000;
  };

  var cleanUp = function() {
    complete = true;
    clearTimeout(timeout);
    mediator.remove(topics.done, subs.done.id);
    mediator.remove(topics.error, subs.error.id);
  };

  subs.done = mediator.subscribe(topics.done, function(result) {
    cleanUp();
    deferred.resolve(result);
  });

  subs.error = mediator.subscribe(topics.error, function(error) {
    cleanUp();
    deferred.reject(error);
  });

  mediator.publish(topics.request, parameter);

  timeout = setTimeout(function() {
    if (!complete) {
      cleanUp();
      deferred.reject(new Error('Mediator request timeout for topic ' +  topic));
    }
  }, options.timeout);

  return deferred.promise;
};

module.exports = mediator;
