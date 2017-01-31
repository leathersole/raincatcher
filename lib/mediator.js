'use strict';

var _ = require('lodash');
var Mediator = require('mediator-js').Mediator;
var Promise = require('bluebird');


/**
 * A version of {@link once} that returns a Promise
 * @param  {String} channel   Channel identifier to wait on a single message
 * @return {Promise}          A promise that is fulfilled with the next published
 *                             message in the channel
 */
Mediator.prototype.promise = function(channel, options, context) {
  var self = this;
  return new Promise(function(resolve) {
    self.once(channel, resolve, options, context);
  });
};

Mediator.prototype.request = function(topic, parameters, options) {
  var self = this;
  options = options || {};
  var topics = {
    request: topic,
    done: options.doneTopic || 'done:' + topic,
    error: options.errorTopic || 'error:' + topic
  };
  var subs = {};

  var uid = null;
  if (_.has(options, 'uid')) {
    uid = options.uid;
  } else if (typeof parameters !== "undefined" && parameters !== null) {
    uid = parameters instanceof Array ? parameters[0] : parameters;
  }

  if (uid !== null) {
    topics.done += ':' + uid;
    topics.error += ':' + uid;
  }

  if (!options.timeout) {
    options.timeout = 2000;
  }

  function unsubscribe() {
    self.remove(topics.done, subs.done.id);
    self.remove(topics.error, subs.error.id);
  }

  var args = [topics.request];
  if (parameters instanceof Array) {
    Array.prototype.push.apply(args, parameters);
  } else {
    args.push(parameters);
  }
  self.publish.apply(mediator, args);

  return new Promise(function(resolve, reject) {
    subs.done = self.once(topics.done, resolve);
    subs.error = mediator.once(topics.error, reject);
  })
  .timeout(options.timeout, new Error('Mediator request timeout for topic ' +  topic))
  .tap(unsubscribe)
  .catch(function(e) {
    unsubscribe();
    // still forward the rejection to clients
    throw e;
  });
};

var mediator = new Mediator();
mediator.Mediator = Mediator;
module.exports = mediator;
