var mediator = require('../lib/mediator');

var assert = require('assert');
var sinon = require('sinon');
require('sinon-as-promised');

describe('Subscribe',function() {
  const TEST_CHANNEL = "test_channel";
  it('Should call callback',function() {
    var subscribeCallback = sinon.spy();
    mediator.subscribe(TEST_CHANNEL,subscribeCallback);
    mediator.publish(TEST_CHANNEL,"my_data");
    sinon.assert.calledOnce(subscribeCallback);
    mediator.publish(TEST_CHANNEL,"another");
    sinon.assert.calledTwice(subscribeCallback);
  });
  it('Should accept args',function() {
    var subscribeCallback = sinon.stub();
    mediator.subscribe(TEST_CHANNEL,subscribeCallback);
    mediator.publish(TEST_CHANNEL,false);
    sinon.assert.calledOnce(subscribeCallback);
    sinon.assert.calledWith(subscribeCallback,false);
  });
  it('Should return args',function() {
    var subscribeCb = sinon.stub().returnsArg(0);
    var testNumber = 123456789;
    var testArray = ['Hello','mediator',', ','how','are','you?'];
    var testString = "Hello World!";
    var testObject = {
      name: 'Testing Object',
      value: undefined
    };
    mediator.subscribe(TEST_CHANNEL,subscribeCb);

    mediator.publish(TEST_CHANNEL,false);
    mediator.publish(TEST_CHANNEL,testNumber);
    mediator.publish(TEST_CHANNEL,testString);
    mediator.publish(TEST_CHANNEL,testArray);
    mediator.publish(TEST_CHANNEL,testObject);

    assert.equal(subscribeCb.getCall(0).returnValue, false);
    assert.equal(subscribeCb.getCall(1).returnValue, testNumber);
    assert.equal(subscribeCb.getCall(2).returnValue, testString);
    assert.equal(subscribeCb.getCall(3).returnValue, testArray);
    assert.equal(subscribeCb.getCall(4).returnValue, testObject);
  });
});