# FeedHenry RainCatcher Push

This module contains a wrapper around RHMAP Push functionality. It leverages the existing mediator pattern to associate Push Notification with mediator topics.

## Client-side usage

### Client-side usage (via broswerify)

//TODO

## Usage in an express backend

### Setup
The server-side component of this WFM module exports a `PushManager` that maintain the mapping between Push payload and mediator topics

```javascript
'use strict';

var PushManager = require('fh-wfm-push/lib/array-store')

module.exports = function(mediator) {
  var pushManager = new PushManager();
  pushManager.add('done:cloud:','wfm:workorder:create', {alias :'assignee.email', alert : 'title'} , mediator);
  pushManager.add('done:cloud:','wfm:message:create', {alias :'receiver.email', alert : 'subject'} , mediator);
}

```

### Server side events

//TODO

### Integration

//TODO

### Push playload structure example

```javascript

  {
    //TODO
  }

```
