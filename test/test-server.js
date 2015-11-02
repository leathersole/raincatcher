'use strict';

var mbaasApi = require('fh-mbaas-api')
  , express = require('express')
  , cc = require('config-chain')
  , cors = require('cors')
  , mediator = require('fh-wfm-mediator/mediator')
  , http = require('http')
  , syncConfig = require('./test-config')
  ;

var app = express()
  , mbaasExpress = mbaasApi.mbaasExpress()
  ;

require('dotenv').config({path: './test/gamma.env'})
process.env.FH_USE_LOCAL_DB=true;
// console.log(process.env)

var config = cc({}).add({
  IP: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
, PORT: process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8002
});

app.set('port', config.get('PORT'));
app.set('base url', config.get('IP'));

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys([]));
app.use('/mbaas', mbaasExpress.mbaas);

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

// fhlint-begin: custom-routes

// setup the sync
require('../sync-server')(mediator, mbaasApi, syncConfig.datasetId, syncConfig.syncOptions);

// register our object handler
require('./object-manager')(mediator);

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var server = http.createServer(app)
  , port  = app.get('port')
  , ip = app.get('base url')
  ;

server.listen(port, ip, function() {
  console.log("App started at: " + new Date() + " on " + ip + ":" +port);
});
