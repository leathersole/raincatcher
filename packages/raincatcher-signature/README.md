# FeedHenry WFM signature module

A signature module for FeedHenry WFM.

## Setup
This module is packaged in a CommonJS format, exporting the name of the Angular namespace.  The module can be included in an angular.js as follows:

Require the browserify dependency as an angular module
```javascript
angular.module('app', [
, require('fh-wfm-signature')
...
])
```
## Client-side usage

### Collecting signatures
The Base64 encoded signature will be assigned to the value attribute of the `signature-form` directive.
```html
<signature-form value="ctrl.model"></signature-form>
```

### Displaying signatures
The `src` attribute of the image tag is bound to the `value` attribute of the signature tag.  To display a base64 encoded string, prefix it with the string: `data:image/png;base64,`
```html
<signature value="ctrl.model"></signature>
```

### Signature CSS styles
Include the module SASS file in your application sass:
```sass
@import 'node_modules/fh-wfm-appform/sass/appform.scss';
```

### Directives

#### Directives

| Name | Attributes |
| ---- | ----------- |
| signature-form | value, options |
| signature | value |
