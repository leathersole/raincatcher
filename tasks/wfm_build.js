'use strict';

let build = require('../lib/build.js');
let watch = require('node-watch');
const taskName = 'wfmTemplate';

module.exports = function(grunt) {

  grunt.config.merge({
    wfmTemplate: {
      build: {},
      watch: {}
    }
  });

  grunt.registerMultiTask('wfmTemplate', 'A build tool for WFM modules', function() {
    const taskConfig = grunt.config.get(this.name);
    const moduleName = getAndCheckModuleName(this, grunt, taskConfig);
    this.async();

    if (this.target === 'build') {
      build(moduleName);
    } else if (this.target === 'watch') {
      watch('./' + taskConfig.templateDir || 'lib/angular/template', () => build(templateDir));
    } else {
      usage(grunt, this.name);
    }
  });

};

function getAndCheckModuleName(task, grunt, taskConfig) {
  let moduleName = grunt.option('module') || task.data.module || taskConfig.module;
  grunt.log.debug("--module=" + moduleName);
  if (!moduleName) {
    usage(grunt, task.name);
  }
  return moduleName;
};

function usage(grunt, taskName) {
  grunt.fail.fatal('Usage: ' + taskName + ':[build | watch] --module=<module name> \nOptions:\n  --module=<module name> If module name is provided, template will be packaged under this module.\n\n');
}
