'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      src: ["lib/**/*.js"]
    },
    mochaTest: {
      test: {
        src: 'test/*-spec.js',
        options: {
          reporters: 'Spec',
          logErrors: true,
          timeout: 10000,
          run: true
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.loadNpmTasks("grunt-eslint");
  grunt.registerTask('mocha',['mochaTest']);
  grunt.registerTask('unit',['eslint','mocha']);
  grunt.registerTask('default', ['unit']);

};
