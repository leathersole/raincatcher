'use strict';

var _ = require('lodash')
  , sync = require('fh-wfm-sync/sync-server')
  , config = require('./lib/config')


module.exports = function(mediator, app, mbaasApi) {
  sync.init(mediator, mbaasApi, config.datasetId, config.syncOptions);
};
