var fs = require('fs');

module.exports = function(grunt) {

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
        mochaTest : {
            all: [
                'tests/numeral/*.js',
                'tests/languages/*.js'
            ]
        },
        karma: {
            options: {
                files: [
                    'numeral.js',
                    'languages/*.js',
                    'tests/numeral/*.js',
                    'tests/languages/*.js'
                ],
                frameworks: [
                    'mocha',
                    'chai'
                ],
                singleRun: true,
                autoWatch: false
            },
            local: {
                browsers: [
                    'Chrome',
                    'Firefox'
                ]
            },
            ci: {
                configFile: 'karma-ci.conf.js'
            }
        },
        uglify: {
            my_target: {
                files: minifiedFiles
            },
            options: {
                preserveComments: 'some'
            }
        },
        concat: {
            languages: {
                src: [
                    'languages/*.js'
                ],
                dest: 'languages.js'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'numeral.js',
                'languages/*.js'
            ],
            options: {
                'node': true,
                'browser': true,
                'curly': true,
                'devel': false,
                'eqeqeq': true,
                'eqnull': true,
                'newcap': true,
                'noarg': true,
                'onevar': true,
                'undef': true,
                'sub': true,
                'strict': false,
                'quotmark': 'single'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', [
        'test'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'mochaTest',
        'karma:local'
    ]);

    grunt.registerTask('test:npm', [
        'jshint',
        'mochaTest'
    ]);

    grunt.registerTask('test:browser', [
        'jshint',
        'karma:local'
    ]);

    // P
    grunt.registerTask('build', [
        'concat',
        'uglify'
    ]);

    // Travis CI task.
    grunt.registerTask('travis', [
        'jshint',
        'mochaTest',
        'karma:ci'
    ]);
};
