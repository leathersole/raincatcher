'use strict';

var _ = require('lodash'),
  fs = require('fs'),
  html2js = require('ng-html2js');

function buildTemplates(moduleName, outputDir, templateDir) {
  if (!moduleName) {
    throw new Error('buildTemplates must be invoked with a moduleName parameter');
  }
  fs.readdir(templateDir, function(err, files) {
    if (err) {
      console.error('Error reading files from', templateDir);
    }
    fs.mkdir(outputDir, '0775', function(err) {
      if (err && err.code !== 'EEXIST') {
        console.log(err);
        throw new Error(err);
      }
      var indexFileContents = '';
      _.each(files, function(file) {
        buildTemplate(moduleName, file, outputDir, templateDir);
        indexFileContents += 'require(\'./' + file + '.js\');\n';
      });
      fs.writeFile(outputDir + '/index.js', indexFileContents, 'utf8', function(err) {
        if (err) {
          console.log(err);
        }
      });
    });

  });
}

function buildTemplate(moduleName, file, outputDir, templateDir) {
  var template = templateDir + '/' + file;
  var inputFile =  './' + template;
  var outputFile = outputDir + '/' + file + '.js';
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
