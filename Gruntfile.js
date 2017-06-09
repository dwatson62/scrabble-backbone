module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss/',
          src: '*.scss',
          dest: 'public/stylesheets/',
          ext: '.css'
        }]
      }
    },

    watch: {
      css: {
        files: 'scss/*.scss',
        tasks: ['sass']
      }
    },

    jshint: {
      all: ['app.js', 'Gruntfile.js', 'js/**/*.js', 'test/**/*.js'],

      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['watch']);

};
