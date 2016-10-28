module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    eslint: {
      src: ["lib/**/*.js"]
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks("grunt-eslint");
  grunt.registerTask('default', ['eslint']);
};
