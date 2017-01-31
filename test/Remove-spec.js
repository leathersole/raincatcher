var mediator = require('../lib/mediator');

var sinon = require('sinon');
require('sinon-as-promised');

describe('Remove',function() {
  const TEST_CHANNEL = "remove:channel";

  it('Should remove all callbacks', function() {
    var firstSpy = sinon.spy();
    var secondSpy = sinon.spy();
    mediator.subscribe(TEST_CHANNEL,firstSpy);
    mediator.subscribe(TEST_CHANNEL,secondSpy);
    mediator.publish(TEST_CHANNEL,"data");
    sinon.assert.calledOnce(firstSpy);
    sinon.assert.calledOnce(secondSpy);
    mediator.remove(TEST_CHANNEL);
    mediator.publish(TEST_CHANNEL,"another-data");
    sinon.assert.calledOnce(firstSpy);
    sinon.assert.calledOnce(secondSpy);
  });

  it('Should remove specific callback', function() {
    var firstCB = sinon.spy();
    var secondCB = sinon.spy();
    mediator.subscribe(TEST_CHANNEL,firstCB);
    mediator.subscribe(TEST_CHANNEL,secondCB);
    mediator.publish(TEST_CHANNEL,123456);
    sinon.assert.calledOnce(firstCB);
    sinon.assert.calledOnce(secondCB);
    mediator.remove(TEST_CHANNEL,secondCB);
    mediator.publish(TEST_CHANNEL,"another portion of data");
    sinon.assert.calledTwice(firstCB);
    sinon.assert.calledOnce(secondCB);
  });
});