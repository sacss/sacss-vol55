module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      html: 'html/**/*'
    },

    jshint: {
      dev: {
        src: ['source/js/functions1.js',
              'source/js/functions2.js']
      }
    },

    concat: {
      dev: {
        src: ['source/js/jquery-2.1.1.min.js',
              'source/js/functions.min.js'],
        dest: 'html/js/main.js'
      }
    },

    uglify: {
      dev: {
        src: ['source/js/functions1.js',
              'source/js/functions2.js'],
        dest: 'source/js/functions.min.js'
      }
    },

    copy: {
      html: {
        files: [{
          expand: true,
          cwd: 'source/',
          src: ['**.html'],
          dest: 'html/'
        }]
      },
      img: {
        files: [{
          expand: true,
          cwd: 'source/img/',
          src: ['**'],
          dest: 'html/img/'
        }]
      }
    },

    image: {
      build: {
        files: [{
          expand: true,
          cwd: 'source/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'html/img/'
        }]
      }
    },

    compass: {
      dev: {
        options: {
          httpPath: '.',
          sassDir: 'source/css',
          cssDir: 'html/css',
          images: 'source/img',
          outputStyle: 'expanded',
          env: 'development',
          relativeAssets: false,
          noLineComments: false
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'html',
          keepalive: true,
          livereload: true
        }
      }
    },

    concurrent: {
      server: {
        tasks: [
          'connect',
          'open',
          'watch'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:8000'
      }
    },

    watch: {
      html: {
        files: ['source/**/*.html'],
        tasks: ['copy', 'image']
      },
      css: {
        files: ['source/css/*.scss'],
        tasks: ['compass']
      },
      js: {
        files: ['source/js/*'],
        tasks: ['jshint', 'uglify', 'concat']
      },
      server: {
        files: [
          'html/**/*'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  grunt.registerTask('compile', ['clean', 'compass', 'copy', 'image', 'uglify', 'concat']);
  grunt.registerTask('server', ['compile', 'concurrent:server']);
};
