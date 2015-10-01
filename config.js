'use strict';

module.exports = {
  apiHost: 'http://localhost:8080',
  apiPath: '/api/wfm/workorder',
  datasetId : 'workOrdersList',
  syncOptions : {
    "sync_frequency" : 2,
    "storage_strategy": "dom"
  }

}
