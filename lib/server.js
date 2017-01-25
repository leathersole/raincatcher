'use strict';

var sync = require('fh-wfm-sync/lib/server'),
  config = require('./config'),
  shortid = require('shortid');

/**
 * Function to generate topic used by the mediator to request, subscribe and publish to.
 *
 * @param {string} topicPrefix Defines the topic name.
 * @param {string} action Defines which CRUDL action is to be used.
 * @param {string} prefix Prefix used to add to the start of the topic to determine if request was done.
 * @param {string} uid Unique identifier to identify unique topics.
 * @returns {string} topic Generated topic to be used by the mediator
 */
function generateTopic(topicPrefix, action, prefix, uid) {
  var topic = "";

  if(prefix) topic = topic + prefix + ':';
  topic = topic + topicPrefix + config.datasetId + ':' + action;
  if(uid) topic = topic + ':' + uid;

  return topic;
}

module.exports = function(mediator, app, mbaasApi) {
  sync.init(mediator, mbaasApi, config.datasetId, config.syncOptions);

  mediator.subscribe(generateTopic(config.cloudTopicPrefix, 'create'), function(messageToCreate, mediatorTopicIdentifier) {
    // Adds an id field required by the new simple store module to the message object that will be created
    messageToCreate.id = shortid.generate();

    mediator.request(generateTopic(config.cloudDataTopicPrefix, 'create'), messageToCreate, {uid: messageToCreate.id})
      .then(function(createdmessage) {
        console.log(typeof createdmessage);
        mediator.publish(generateTopic(config.cloudTopicPrefix, 'create', 'done', mediatorTopicIdentifier), createdmessage);
      });
  });

  mediator.subscribe(generateTopic(config.cloudTopicPrefix, 'list'), function() {
    mediator.request(generateTopic(config.cloudDataTopicPrefix, 'list'))
      .then(function(listOfmessage) {
        mediator.publish(generateTopic(config.cloudTopicPrefix, 'list', 'done'), listOfmessage);
      });
  });

  mediator.subscribe(generateTopic(config.cloudTopicPrefix, 'update'), function(messageToUpdate) {
    mediator.request(generateTopic(config.cloudDataTopicPrefix, 'update'), messageToUpdate, {uid: messageToUpdate.id})
      .then(function(updatedmessage) {
        mediator.publish(generateTopic(config.cloudTopicPrefix, 'update', 'done', updatedmessage.id), updatedmessage);
      });
  });

  mediator.subscribe(generateTopic(config.cloudTopicPrefix, 'read'), function(uid) {
    mediator.request(generateTopic(config.cloudDataTopicPrefix, 'read'), uid)
      .then(function(readmessage) {
        mediator.publish(generateTopic(config.cloudTopicPrefix, 'read', 'done', uid), readmessage);
      });
  });

  mediator.subscribe(generateTopic(config.cloudTopicPrefix, 'delete'), function(uid) {
    mediator.request(generateTopic(config.cloudDataTopicPrefix, 'delete'), uid)
      .then(function(deletedmessage) {
        console.log(deletedmessage);
        mediator.publish(generateTopic(config.cloudTopicPrefix, 'delete', 'done', uid), deletedmessage);
      });
  });
};
