# FeedHenry WFM message

This module contains a message model representation and its related services :
- Backend services
- Frontend services
- Frontend UI templates

## Client-side usage

### Client-side usage (via broswerify)

#### Setup
This module is packaged in a CommonJS format, exporting the name of the Angular namespace.  The module can be included in an angular.js as follows:

```javascript
angular.module('app', [
, require('fh-wfm-message')
...
])
```

#### Integration

##### Angular controller
A sync manager must first be initialized using the `messageSync.createManager()`.  This can be placed, for instance, in the `resolve` config of a `ui-router` controlled application.

```javascript
resolve: {
  messageManager: function(messageSync) {
    return messageSync.createManager();
  }
}
```
For a more complete example, please check the [demo portal app](https://github.com/feedhenry-staff/wfm-portal/blob/master/src/app/main.js).


##### `messageSync` API
These messageSync API methods all return Promises:

| messageSync method | Description |
| -------------------- | ----------- |
| `messageSync.manager.list` | list all messages |
| `messageSync.manager.create(message)` | create a message |
| `messageSync.manager.read(messageId)` | read a message |
| `messageSync.manager.update(message)` | update a message |

#### message directives

| Name | Attributes |
| ---- | ----------- |
| message-list | list, selectedModel |
| message-form | value, workers |
| message-detail | message |

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

// setup the wfm message sync server
require('fh-wfm-message/server')(mediator, app, mbaasExpress);

```

### Server side events
the module broadcasts, and listens for the following events

| Listens for | Responds with |
| ----------- | ------------- |
| `wfm:message:list` | `done:wfm:message:list` |
| `wfm:message:read` | `done:wfm:message:read` |
| `wfm:message:update` | `done:wfm:message:update` |
| `wfm:message:create` | `done:wfm:message:create` |

### Integration

Check this [demo cloud application](https://github.com/feedhenry-staff/wfm-cloud/blob/master/lib/app/message.js)

### message data structure example

```javascript

  {
    id: 1276001,
    receiverId: "156340",
    status: "unread",
    sender: {
      avatar:"https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg",
      name:"Trever Smith"
    },
    subject: 'Adress change w41',
    content: 'hallo hallo'
  }

```
