'use strict';

var sync = require('fh-wfm-sync/lib/server'),
  config = require('./config');

module.exports = function(mediator, app, mbaasApi) {
  sync.init(mediator, mbaasApi, config.datasetId, config.syncOptions);

  //Adds an id field required by the new simple store to the message that will be created.
  mediator.subscribe('wfm:cloud:messages:create', function(messageToCreate, ts) {
    messageToCreate.id = ts;
    mediator.publish('wfm:cloud:data:messages:create', messageToCreate);
  });
};
