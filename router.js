'use strict';

var express = require('express'),
    config = require('./config');

function initSync(mediator, mbaasApi){
  var dataListHandler = function(dataset_id, query_params, cb, meta_data){
    var syncData = {};
    mediator.publish('workorders:load');
    return mediator.promise('workorders:loaded').then(function(data) {
      data.forEach(function(workorder) {
        syncData[workorder.id] = workorder;
      });
      return cb(null, syncData);
    });


  };

  var dataCreateHandler = function(datasetId, data, cb, meta_data) {
    var ts = new Date().getTime();  // TODO: replace this with a proper uniqe (eg. a cuid)
    var workorder = data;
    workorder.createdTs = ts;
    mediator.publish('workorder:create', workorder);
    return mediator.promise('workorder:created:' + ts).then(function(createdWorkorder) {
      var res = {
        "uid" : createdWorkorder.id,
        "data" : createdWorkorder
      }
      return cb(null, res);
    });
  };

  var dataSaveHandler = function(datasetId, uid, data, cb, meta_data) {
    mediator.publish('workorder:save', data);
    return mediator.promise('workorder:saved:' + uid).then(function(updatedWorker) {
      return cb(null, updatedWorker);
    });
  };

  var dataGetHandler = function(datasetId, uid, cb, meta_data) {
    mediator.publish('workorder:load', uid);
    return mediator.promise('workorder:loaded:' + uid).then(function(loadedWorker) {
      return cb(null, loadedWorker);
    });

  };

  var options = {
    "sync_frequency": 10, // How often to synchronise data with the back end data store in seconds. Default: 10s
    "logLevel":"info" // The level of logging. Can be usful for debugging. Valid options including: 'silly', 'verbose', 'info', 'warn', 'debug', 'error'
  };
  //start the sync service
  mbaasApi.sync.init(config.datasetId, options, function(err) {
    if (err) {
      console.error(err);
    } else {
      mbaasApi.sync.handleList(config.datasetId, dataListHandler);
      mbaasApi.sync.handleCreate(config.datasetId, dataCreateHandler);
      mbaasApi.sync.handleUpdate(config.datasetId, dataSaveHandler);
      mbaasApi.sync.handleRead(config.datasetId, dataGetHandler);
    }
  });
}

function initRouter(mediator, mbaasApi) {
  var router = express.Router();
 //This is probably not needed anymore after using sync service
/*  router.route('/').get(function(req, res, next) {
    mediator.once('workorders:loaded', function(data) {
      res.json(data);
    });
    mediator.publish('workorders:load');
  });
  router.route('/:id').get(function(req, res, next) {
    var workorderId = req.params.id
    mediator.once('workorder:loaded:' + workorderId, function(data) {
      res.json(data);
    });
    mediator.publish('workorder:load', workorderId);
  });
  router.route('/:id').put(function(req, res, next) {
    var workorderId = req.params.id;
    var workorder = req.body;
    // console.log('req.body', req.body);
    mediator.once('workorder:saved:' + workorderId, function(savedWorkorder) {
      res.json(savedWorkorder);
    });
    mediator.publish('workorder:save', workorder);
  });
  router.route('/').post(function(req, res, next) {
    var ts = new Date().getTime();  // TODO: replace this with a proper uniqe (eg. a cuid)
    var workorder = req.body;
    workorder.createdTs = ts;
    mediator.once('workorder:created:' + ts, function(createdWorkorder) {
      res.json(createdWorkorder);
    });
    mediator.publish('workorder:create', workorder);
  })*/

  return router;
};

module.exports = function(mediator, app, mbaasApi) {
  var router = initRouter(mediator, mbaasApi);
  initSync(mediator, mbaasApi);




  app.use(config.apiPath, router);

};
