var fs = require('fs');

module.exports = function(grunt) {
    'use strict';

    var minifiedFiles = {
            'min/numeral.min.js' : [
                'numeral.js'
            ],
            'min/languages.min.js': [
                'languages.js'
            ]
        };

    // all the lang files need to be added manually
    fs.readdirSync('./languages').forEach(function (path) {
        var file = path.slice(0, -3),
            destination = 'min/languages/' + file + '.min.js',
            src = ['languages/' + path];

        minifiedFiles[destination] = src;
    });

    grunt.initConfig({
        nodeunit : {
            all : ['tests/**/*.js']
        },
        uglify: {
            target: {
                files: minifiedFiles
            },
            options: {
                preserveComments: 'some'
            }
        },
        concat: {
            languages: {
                src: [
                    'languages/**/*.js'
                ],
                dest: 'languages.js'
            }
        },
        jshint: {
            options: {
                jshintrc : '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'numeral.js',
                'languages/**/*.js'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('test', [
        'jshint',
        'nodeunit'
    ]);

    // P
    grunt.registerTask('release', [
        'jshint',
        'nodeunit',
        'concat',
        'uglify'
    ]);

    // Travis CI task.
    grunt.registerTask('travis', ['test']);
};