var mediator = require('../lib/mediator');

var sinon = require('sinon');
var Promise = require('bluebird');

sinon.config = {
  useFakeTimers: false
};

describe('Promise',function() {
  const TEST_CHANNEL = "promise:channel";

  it('Should call delayed callback',function(done) {
    var promiseCB = sinon.stub();
    mediator.promise(TEST_CHANNEL).then(promiseCB);
    var promised = Promise.delay(1, "WUHU");
    mediator.publish(TEST_CHANNEL, promised);
    setTimeout(function() {
      sinon.assert.called(promiseCB);
      sinon.assert.calledWith(promiseCB.getCall(0),"WUHU");
      done();
    }, 3);
  });

  it('Should be called only once',function(done) {
    var promiseCB = sinon.stub();
    mediator.promise(TEST_CHANNEL).then(promiseCB);
    var promised = Promise.delay(1, {
      goodCharacters: ['Frodo','Aragorn','Legolas'],
      evilOnes: ['Sauron','Saruman']
    });
    mediator.publish(TEST_CHANNEL, promised);
    mediator.publish(TEST_CHANNEL, ['Another','Set','Of','Data','That','Should','Not','Be','Accepted']);
    setTimeout(function() {
      sinon.assert.callCount(promiseCB,1);
      done();
    }, 3);
  });

  it('Should call error callback',function(done) {
    var successCB = sinon.spy();
    var errorCB = sinon.spy();
    mediator.promise(TEST_CHANNEL).then(successCB, errorCB);
    var rejectedData = Promise.reject(new Error('Boromir died')).delay(1);
    mediator.publish(TEST_CHANNEL,rejectedData);
    setTimeout(function() {
      sinon.assert.notCalled(successCB);
      sinon.assert.callCount(errorCB,1);
      done();
    }, 3);
  });
});