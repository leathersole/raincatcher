# FeedHenry WFM workorder

This module contains a workorder model representation and its related services :
- Backend services
- Frontend services
- Frontend UI templates

## Client-side usage

### Client-side usage (via broswerify)

#### Setup
This module is packaged in a CommonJS format, exporting the name of the Angular namespace.  The module can be included in an angular.js as follows:

```javascript
angular.module('app', [
, require('fh-wfm-workorder')
...
])
```

#### Integration

##### Angular controller
A sync manager must first be initialized using the `workorderSync.createManager()`.  This can be placed, for instance, in the `resolve` config of a `ui-router` controlled application.

```javascript
resolve: {
  workorderManager: function(workorderSync) {
    return workorderSync.createManager();
  }
}
```
For a more complete example, please check the [demo portal app](https://github.com/feedhenry-staff/wfm-portal/blob/master/src/app/main.js).


##### `workorderSync` API
These workorderSync API methods all return Promises:

| workorderSync method | Description |
| -------------------- | ----------- |
| `workorderSync.manager.list` | list all workorders |
| `workorderSync.manager.create(workorder)` | create a workorder |
| `workorderSync.manager.read(workorderId)` | read a workorder |
| `workorderSync.manager.update(workorder)` | update a workorder |

#### Workorder directives

| Name | Attributes |
| ---- | ----------- |
| workorder-list | workorders, resultMap, selectedModel |
| workorder | workorder, assignee, status |
| workorder-form | value, workflows, workers |
| workorder-status | status |
| workorder-sunbmission-result | result, step |


## Usage in an express backend

### Setup
The server-side component of this WFM module exports a function that takes express and mediator instances as parameters, as in:

```javascript
var express = require('express')
  , app = express()
  , mbaasExpress = mbaasApi.mbaasExpress()
  , mediator = require('fh-wfm-mediator/lib/mediator')
  ;

// configure the express app
...

// setup the wfm workorder sync server
require('fh-wfm-workorder/server')(mediator, app, mbaasExpress);

```

### Server side events
the module broadcasts, and listens for the following events

| Listens for | Responds with |
| ----------- | ------------- |
| `wfm:workorder:list` | `done:wfm:workorder:list` |
| `wfm:workorder:read` | `done:wfm:workorder:read` |
| `wfm:workorder:update` | `done:wfm:workorder:update` |
| `wfm:workorder:create` | `done:wfm:workorder:create` |

### Integration

Check this [demo cloud application](https://github.com/feedhenry-staff/wfm-cloud/blob/master/lib/app/workorder.js)

### Workorder data structure example

```javascript

  {
     id: 1276001,
     workflowId: '1339',
     assignee: '156340',
     type: 'Job Order',
     title: 'Footpath in disrepair',
     status: 'New',
     startTimestamp: '2015-10-22T14:00:00Z',
     address: '1795 Davie St, Vancouver, BC V6G 2M9',
     location: [49.287227, -123.141489],
     summary: 'Please remove damaged kerb and SUPPLY AND FIX 1X DROP KERB CENTRE BN 125 X 150 cart away from site outside number 3.'
  }

```
