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
    },

    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          almond: true,

          replaceRequireScript: [{
            files: ['dist/index.html'],
            module: 'main'
          }],

          modules: [{name: 'main'}],
          baseUrl: 'js/scripts',

          mainConfigFile: 'js/scripts/main.js', // contains path specifications and nothing else important with respect to config

          keepBuildDir: true,
          dir: '.tmp/scripts',

          optimize: 'none', // optimize by uglify task
          useStrict: true,
          wrap: true

        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-requirejs');

  grunt.registerTask('default', ['watch']);

};
