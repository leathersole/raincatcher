var mediator = require('../lib/mediator');

var sinon = require('sinon');

describe('Once',function() {

  const TEST_CHANNEL = "once:channel";

  it('Should be registered only once',function() {
    var CB = sinon.spy();
    mediator.once(TEST_CHANNEL,CB);
    mediator.publish(TEST_CHANNEL,"sample_data");
    sinon.assert.calledOnce(CB);
    mediator.publish(TEST_CHANNEL,"should not be subscribed");
    sinon.assert.calledOnce(CB);
    mediator.publish("not:even:valid:channel",{
      username: 'Gandalf',
      message: 'You shall not pass'
    });
    sinon.assert.calledOnce(CB);
  });
});