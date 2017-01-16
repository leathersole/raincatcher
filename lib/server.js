'use strict';

var sync = require('fh-wfm-sync/lib/server'),
  config = require('./config'),
  shortid = require('shortid');

module.exports = function(mediator, app, mbaasApi) {
  sync.init(mediator, mbaasApi, config.datasetId, config.syncOptions);

  mediator.subscribe(config.topicPrefix + config.datasetId + ':create', function(messageToCreate, mediatorTopicIdentifier) {
    // Add an id field required by the new simple store module to the message object that will be created
    messageToCreate.id = shortid.generate();

    mediator.request(config.topicPrefix + 'data:' + config.datasetId + ':create', messageToCreate, {uid: messageToCreate.id})
      .then(function(createdmessage) {
        mediator.publish('done:' + config.topicPrefix + config.datasetId + ':create:' + mediatorTopicIdentifier, createdmessage);
      });
  });

  mediator.subscribe(config.topicPrefix + config.datasetId + ':list', function() {
    mediator.request(config.topicPrefix + 'data:' + config.datasetId + ':list')
      .then(function(listOfmessage) {
        mediator.publish('done:' + config.topicPrefix + config.datasetId + ':list', listOfmessage);
      });
  });

  mediator.subscribe(config.topicPrefix + config.datasetId + ':update', function(messageToUpdate) {
    mediator.request(config.topicPrefix + 'data:' + config.datasetId + ':update', messageToUpdate, {uid: messageToUpdate.id})
      .then(function(updatedmessage) {
        mediator.publish('done:' + config.topicPrefix + config.datasetId + ':update:' + updatedmessage.id, updatedmessage);
      });
  });

  mediator.subscribe(config.topicPrefix + config.datasetId + ':read', function(uid) {
    mediator.request(config.topicPrefix + 'data:' + config.datasetId + ':read', uid)
      .then(function(message) {
        mediator.publish('done:' + config.topicPrefix + config.datasetId + ':read:' + uid, message);
      });
  });

  mediator.subscribe(config.topicPrefix + config.datasetId + ':delete', function(uid) {
    mediator.request(config.topicPrefix + 'data:' + config.datasetId + ':delete', uid)
      .then(function(message) {
        mediator.publish('done:' + config.topicPrefix + config.datasetId + ':delete:' + uid, message);
      });
  });
};
