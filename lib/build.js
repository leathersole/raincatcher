/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    html2js = require('ng-html2js');

var templateDir = 'lib/angular/template';

function buildTemplates(moduleName) {
  if (!moduleName) {
    throw new Error('buildTemplates must be invoked with a moduleName parameter');
  }
  fs.readdir(templateDir, function(err, files) {
    if (err) {
      console.error('Error reading files from', templateDir);
    }
    fs.mkdir('dist', '0775', function(err) {
      if (err && err.code != 'EEXIST') {
        console.log(err);
        throw new Error(err);
      }
      var indexFileContents = '';
      _.each(files, function(file) {
        buildTemplate(moduleName, file);
        indexFileContents += 'require(\'./' + file + '.js\');\n';
      });
      fs.writeFile('dist/index.js', indexFileContents, 'utf8', function(err) {
        if (err) {
          console.log(err);
        }
      });
    });

  });
}

function buildTemplate(moduleName, file) {
  var template = templateDir + '/' + file;
  var inputFile =  './' + template;
  var outputFile = 'dist/' + file + '.js';
  var moduleVar = 'ngModule';

  console.log('Processing template:', inputFile);

  fs.readFile(inputFile, 'utf8', function(err, content) {
    var inputAlias = 'wfm-template/' + file;
    inputAlias = inputAlias.replace(/\\/g, '/');
    var output = html2js(inputAlias, content, moduleName, moduleVar);

    fs.writeFile(outputFile, output, 'utf8', function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
}

module.exports = buildTemplates;
