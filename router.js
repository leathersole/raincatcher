'use strict';

var express = require('express'),
    config = require('./config'),
    mbaasApi = require('fh-mbaas-api');

function initRouter(mediator) {

  var dataListHandler = function(dataset_id, query_params, cb, meta_data){
    mediator.publish('workorders:load');
    mediator.promise('workorders:loaded').then(function(data) {
      var syncData = {};
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
    mediator.promise('workorder:created:' + ts).then(function(createdWorkorder) {
      var res = {
        "uid" : createdWorkorder.id,
        "data" : createdWorkorder
      }
      return cb(null, res);
    });
  };

  var dataSaveHandler = function(datasetId, uid, data, cb, meta_data) {
    mediator.publish('workorder:save', workorder);
    mediator.promise('workorder:saved:' + uid).then(function(updatedWorker) {
      return cb(null, updatedWorker);
    });
  };

  var dataGetHandler = function(datasetId, uid, data, cb, meta_data) {
    mediator.publish('workorder:load', uid);
    mediator.promise('workorder:loaded:' + uid).then(function(loadedWorker) {
      return cb(null, loadedWorker);
    });
  };

  //start the sync service
  mbaasApi.sync.init(config.datasetId, config.syncOptions, function(err) {
    if (err) {
      console.error(err);
    } else {
      mbaasApi.sync.handleList(config.datasetId, dataListHandler);
      mbaasApi.sync.handleCreate(config.datasetId, dataCreateHandler);
      mbaasApi.sync.handleUpdate(config.datasetId, dataSaveHandler);
      mbaasApi.sync.handleRead(config.datasetId, dataGetHandler);
    }
  });

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

module.exports = function(mediator, app) {
  var router = initRouter(mediator);
  app.use(config.apiPath, router);
};
