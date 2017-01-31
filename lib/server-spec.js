var sinon = require('sinon');
var assert = require('assert');
require('sinon-as-promised');
var proxyquire = require('proxyquire');
var express = require('express');
var app = express();
var mockMbaasApi = {};
var mockSync = {
  init: sinon.spy()
};

var mediator = require('fh-wfm-mediator/lib/mediator.js');

/**
 * Set of unit tests for the sync topic subscribers
 */
describe('Message Sync', function () {
  var server = proxyquire('./server.js', {
    'fh-wfm-sync/lib/server': mockSync
  });

  //Create
  it('should publish to done create cloud topic when the request to create a message has been completed', function (done) {
    var data = {value: 'test-message-create'};
    var topicId = "testId";
    var idTest = "";

    server(mediator, app, mockMbaasApi);

    //Mock of the data topic subscriber in the storage module
    mediator.subscribe("wfm:cloud:data:messages:create", function (createdMessage) {
      //Publish to done create data topic to fake message creation by storage module
      mediator.publish("done:wfm:cloud:data:messages:create:" + createdMessage.id, createdMessage);
    });

    mediator.subscribe("done:wfm:cloud:messages:create", function (createdMessage) {
      idTest = createdMessage.id;
    });

    mediator.request("wfm:cloud:messages:create", [data, topicId], {uid: topicId}).then(function(createdMessage) {
      assert.equal(data.value, createdMessage.value, "Created Message should have the same value as initial data passed during request");
      assert(createdMessage.id, "Created message should have a generated id field");
      assert.equal(createdMessage.id, idTest);
      done();
    });

  });

  //List
  it('should publish to done list cloud topic when the request to list a message has been completed', function (done) {
    var listMessageArray = [{id: 'test-message-1', value:'test-message'},
        {id: 'test-message-2', value:'test-message'},
        {id: 'test-message-3', value:'test-message'}];

    server(mediator, app, mockMbaasApi);

    //Mock of the data topic subscriber in the storage module
    mediator.subscribe("wfm:cloud:data:messages:list", function() {
      //Publish to done list data topic to fake getting the list of messages by storage module
      mediator.publish("done:wfm:cloud:data:messages:list", listMessageArray);
    });

    // mediator.subscribe("done:wfm:cloud:messages:list", function (listMessage) {
    //   //Returns the list of messages here
    //   console.log('[Subscribe done cloud topic] list of messages: ', listMessage);
    // });
    mediator.request("wfm:cloud:messages:list").then(function(listMessage) {
      //listMessage is undefined here
      console.log('[Mediator Request Cloud Topic] List of messages: ', listMessage);
      assert(listMessage, "Should return the list of messages");
      assert.deepEqual(listMessage, listMessageArray, "List of messages received should be the same as the list of messages passed by the mock storage module");
      done();
    });

  });

  // Update
  it('should publish to done update cloud topic when the request to update a message has been completed', function(done) {
    var messageToUpdate = {id:'testID', value: 'message-updated'};

    server(mediator, app, mockMbaasApi);

    //Mock of the data topic subscriber in the storage module
    mediator.subscribe("wfm:cloud:data:messages:update", function(messageToUpdate) {
      //Publish to done update data topic to fake getting the update of messages by storage module
      mediator.publish("done:wfm:cloud:data:messages:update:" + messageToUpdate.id, messageToUpdate);
    });

    mediator.request("wfm:cloud:messages:update", messageToUpdate, {uid: messageToUpdate.id}).then(function(updatedMessage) {
      assert(updatedMessage, "Should return the updated message");
      assert.deepEqual(updatedMessage, messageToUpdate, "The message updated should be the same as the message returned by the mock storage module");
      done();
    });
  });

  //Read
  it('should publish to done read cloud topic when the request to read a message has been completed', function (done) {
    var messageRead = {id:'testID', value: 'message-read'};
    var uid = "testID";

    server(mediator, app, mockMbaasApi);

    //Mock of the data topic subscriber in the storage module
    mediator.subscribe("wfm:cloud:data:messages:read", function(uid) {
      //Publish to done read data topic to fake the reading of messages by storage module
      mediator.publish("done:wfm:cloud:data:messages:read:" + uid, messageRead);
    });

    mediator.request("wfm:cloud:messages:read", uid).then(function(readMessage) {
      assert(readMessage, "Should return the message read");
      assert.equal(uid, readMessage.id, "Message Read should have the same id as the uid given in the request");
      done();
    });
  });

  //Delete
  it('should publish to done delete cloud topic when the request to delete a message has been completed', function (done) {
    var messageToDelete = {id:'testID', value: 'message-deleted'};
    var uid = "testID";

    server(mediator, app, mockMbaasApi);

    //Mock of the data topic subscriber in the storage module
    mediator.subscribe("wfm:cloud:data:messages:delete", function(uid) {
      //Publish to done delete data topic to fake the deleteing of messages by storage module
      mediator.publish("done:wfm:cloud:data:messages:delete:" + uid, messageToDelete);
    });

    mediator.request("wfm:cloud:messages:delete", uid).then(function(deletedMessage) {
      assert(deletedMessage, "Should return the deleted message");
      assert.equal(uid, deletedMessage.id, "Deleted message should have the same id as the uid given in the request");
      done();
    });
  });

});
