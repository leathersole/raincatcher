#!/usr/bin/env node
/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/

var argv = require('minimist')(process.argv.slice(2))
  , build = require('./build')
  , watch = require('node-watch')
  ;

var moduleName;
var watching = false;

if (argv.m || argv.module) {
  moduleName = argv.m || argv.module;
}

if (argv.w || argv.watch) {
  watching = argv.w || argv.watch;
}

if (moduleName) {
  build(moduleName);
  if (watching) {
    watch('./lib/template', function(file) {
      build(moduleName);
    });
  }
} else {
  console.error('Usage: build -m <module name> \nOptions:\n  -m, --module <module name>   If module name is provided, template will be packaged under this module.\n  -w, --watch Watch the lib/template folder, trigger the build on changes.');
  process.exit();
}
