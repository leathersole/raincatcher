# FeedHenry WFM Schedule [![Build Status](https://travis-ci.org/feedhenry-raincatcher/raincatcher-schedule.png)](https://travis-ci.org/feedhenry-raincatcher/raincatcher-schedule)

This module contains a set of Angular directives to manage a scheduler to schedule workorders.

## Client-side usage

### Client-side usage (via broswerify)

#### Setup
This module is packaged in a CommonJS format, exporting the name of the Angular namespace.  The module can be included in an angular.js as follows:

```javascript
angular.module('app', [
, require('fh-wfm-schedule')
...
])
```

#### Directives

| Name | Attributes |
| ---- | ----------- |
| schedule | workers, workorders |
| schedule-workorder-chip | workorder |

For a more complete example, please check the [demo portal app](https://github.com/feedhenry-staff/wfm-portal/tree/master/src/app/schedule).
