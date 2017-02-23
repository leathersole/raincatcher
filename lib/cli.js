#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2)),
  build = require('./build'),
  watch = require('node-watch');

var moduleName;
var watching = false;
var templateDir = 'lib/angular/template';
var outputDir = 'dist';
if (argv.m || argv.module) {
  moduleName = argv.m || argv.module;
}

if (argv.o || argv.output) {
  outputDir = argv.o|| argv.output;
}

if (argv.w || argv.watch) {
  watching = argv.w || argv.watch;
}

if (argv.t || argv.templateDir) {
  templateDir = argv.t|| argv.templateDir;
}

if (moduleName) {
  build(moduleName, outputDir, templateDir);
  if (watching) {
    watch('./' + templateDir, function() {
      build(moduleName, outputDir, templateDir);
    });
  }
} else {
  console.error('Usage: build -m <module name> \nOptions:\n  -m, --module <module name>   If module name is provided, template will be packaged under this module.\n  -w, --watch Watch the '+templateDir+' folder, trigger the build on changes.');
  process.exit();
}
