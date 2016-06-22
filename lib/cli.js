#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2)),
    build = require('./build'),
    watch = require('node-watch');

var moduleName;
var watching = false;
var templateDir = 'lib/angular/template';

if (argv.m || argv.module) {
  moduleName = argv.m || argv.module;
}

if (argv.w || argv.watch) {
  watching = argv.w || argv.watch;
}

if (moduleName) {
  build(moduleName);
  if (watching) {
    watch('./' + templateDir, function(file) {
      build(moduleName);
    });
  }
} else {
  console.error('Usage: build -m <module name> \nOptions:\n  -m, --module <module name>   If module name is provided, template will be packaged under this module.\n  -w, --watch Watch the '+templateDir+' folder, trigger the build on changes.');
  process.exit();
}
