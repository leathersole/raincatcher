var sinon = require('sinon');
require('sinon-as-promised');

var mockCreatedMessage = {id: 'testId'},
  mockListMessage = [],
  mockUpdatedMessage = {id: 'testId'},
  mockReadMessage = {id: 'testId', value: 'test-message-read'},
  mockDeletedMessage = {id:'testId', value: 'test-message-delete'},
  mockTopicId = "testId",
  mockUID = "testId";

/**
 * Function which mocks the subscribe functionality of mediator.
 * @returns {stub}
 */
function subscribe() {
  var subscribeStub = sinon.stub();

  subscribeStub.withArgs("wfm:cloud:messages:create", sinon.match.func)
    .callsArgWith(1, mockCreatedMessage, mockTopicId);

  subscribeStub.withArgs("wfm:cloud:messages:list", sinon.match.func)
    .callsArg(1);

  subscribeStub.withArgs("wfm:cloud:messages:update", sinon.match.func)
    .callsArgWith(1, mockCreatedMessage);

  subscribeStub.withArgs("wfm:cloud:messages:read", sinon.match.func)
    .callsArgWith(1, mockUID);

  subscribeStub.withArgs("wfm:cloud:messages:delete", sinon.match.func)
    .callsArgWith(1, mockUID);


  subscribeStub.throws("Invalid Argument");

  return subscribeStub;
}

/**
 * Function which mocks the request functionality of mediator.
 * @returns {stub}
 */
function request() {
  var requestStub = sinon.stub();

  requestStub.withArgs("wfm:cloud:data:messages:create", sinon.match.object, sinon.match.object)
    .resolves(mockCreatedMessage);

  requestStub.withArgs("wfm:cloud:data:messages:list")
    .resolves(mockListMessage);

  requestStub.withArgs("wfm:cloud:data:messages:update", sinon.match.object, sinon.match.object)
    .resolves(mockUpdatedMessage);

  requestStub.withArgs("wfm:cloud:data:messages:read", sinon.match.string)
    .resolves(mockReadMessage);

  requestStub.withArgs("wfm:cloud:data:messages:delete", sinon.match.string)
    .resolves(mockDeletedMessage);

  requestStub.throws("Invalid Argument");
  return requestStub;
}

/**
 * Function which mocks the publish functionality of mediator.
 * @returns {stub}
 */
function publish() {
  var publishStub = sinon.stub();
  var doneTopic = "done:wfm:cloud:messages:";

  publishStub.withArgs(doneTopic + "create:" + mockTopicId, sinon.match.object);
  publishStub.withArgs(doneTopic + "list", sinon.match.object);
  publishStub.withArgs(doneTopic + "update:" + mockTopicId, sinon.match.object);
  publishStub.withArgs(doneTopic + "read:" + mockTopicId, sinon.match.object);
  publishStub.withArgs(doneTopic + "delete:" + mockTopicId, sinon.match.object);

  publishStub.throws("Invalid Argument");
  return publishStub;
}

module.exports = {
  subscribe: subscribe(),
  request: request(),
  publish: publish()
};
