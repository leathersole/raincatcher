# FeedHenry WFM Map [![Build Status](https://travis-ci.org/feedhenry-raincatcher/raincatcher-map.png)](https://travis-ci.org/feedhenry-raincatcher/raincatcher-map)

This module provides an Angular directive to represent workorders on a map.

## Client-side usage

### Client-side usage (via broswerify)

#### Setup
This module is packaged in a CommonJS format, exporting the name of the Angular namespace.  The module can be included in an angular.js as follows:

```javascript
angular.module('app', [
, require('fh-wfm-map')
...
])
```

#### Directives

| Name | Attributes |
| ---- | ----------- |
| workorder-map | list, center, workorders |


For a more complete example, please check the [demo portal app](https://github.com/feedhenry-staff/wfm-portal/blob/master/src/app/map/map.js).
