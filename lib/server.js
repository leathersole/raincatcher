'use strict';

var sync = require('fh-wfm-sync/lib/server');
var config = require('./config');
var shortid = require('shortid');

var MessageCloudDataTopics = require('fh-wfm-mediator/lib/topics');
var MessageCloudTopics = require('fh-wfm-mediator/lib/topics');

module.exports = function(mediator, app, mbaasApi) {
  var messageCloudDataTopics = new MessageCloudDataTopics(mediator);
  messageCloudDataTopics.prefix(config.cloudDataTopicPrefix).entity(config.datasetId);
  var messageCloudTopics = new MessageCloudTopics(mediator);
  messageCloudTopics.prefix(config.cloudTopicPrefix).entity(config.datasetId);

  sync.init(mediator, mbaasApi, config.datasetId, config.syncOptions);

  /**
   * Subscribers to sync topics which publishes to a data storage topic, subscribed to by a storage module,
   * for CRUDL operations. Publishes the response received from the storage module back to sync
   */
  messageCloudTopics.on('create', function(messageToCreate, mediatorTopicIdentifier) {
    // Adds an id field required by the new simple store module to the message object that will be created
    messageToCreate.id = shortid.generate();

    messageCloudDataTopics.request('create', messageToCreate, {uid: messageToCreate.id})
      .then(function(createdmessage) {
        mediator.publish(messageCloudTopics.getTopic('create', 'done') + ':' + mediatorTopicIdentifier, createdmessage);
      });
  });

  messageCloudTopics.on('list', function() {
    messageCloudDataTopics.request('list')
      .then(function(listOfMessages) {
        console.log('>>>>>>> list of messages returned', listOfMessages );
        mediator.publish(messageCloudTopics.getTopic('list', 'done'), listOfMessages);
      });
  });

  mediator.subscribe(messageCloudTopics.getTopic('list', 'done'), function() {
    mediator.request(messageCloudDataTopics.getTopic('list', 'done'))
      .then(function(listOfmessage) {
        mediator.publish(messageCloudTopics.getTopic('list', 'done'), listOfmessage);
      });
  });

  messageCloudTopics.on('update', function(messageToUpdate) {
    messageCloudDataTopics.request('update', messageToUpdate, {uid: messageToUpdate.id})
      .then(function(updatedMessage) {
        mediator.publish(messageCloudTopics.getTopic('update', 'done') + ':' + updatedMessage.id, updatedMessage);
      });
  });

  messageCloudTopics.on('read', function(uid) {
    messageCloudDataTopics.request('read', uid)
      .then(function(readMessage) {
        mediator.publish(messageCloudTopics.getTopic('read', 'done') + ':' + uid, readMessage);
      });
  });

  messageCloudTopics.on('delete', function(uid) {
    messageCloudDataTopics.request('delete', uid)
      .then(function(deletedMessage) {
        mediator.publish(messageCloudTopics.getTopic('delete', 'done') + ':' + uid, deletedMessage);
      });
  });
};
