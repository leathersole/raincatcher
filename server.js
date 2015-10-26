'use strict';

var sync = require('./lib/sync-server')
  , router = require('./lib/router')

module.exports = function(mediator, app, mbaasApi) {
  sync.init(mediator, mbaasApi);
  router.init(mediator, app);
};
