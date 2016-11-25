var fs = require('fs');

module.exports = function(grunt) {

    var minifiedFiles = {
            'min/numeral.min.js' : [
                'numeral.js'
            ],
            'min/locales.min.js': [
                'locales.js'
            ]
        };

    // all the lang files need to be added manually
    fs.readdirSync('./locales').forEach(function (path) {
        var file = path.slice(0, -3),
            destination = 'min/locales/' + file + '.min.js',
            src = ['locales/' + path];

        minifiedFiles[destination] = src;
    });

    grunt.initConfig({
        mochaTest : {
            all: [
                'tests/numeral/*.js',
                'tests/locales/*.js'
            ]
        },
        karma: {
            options: {
                files: [
                    'numeral.js',
                    'locales/*.js',
                    'tests/numeral/*.js',
                    'tests/locales/*.js'
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
            locales: {
                src: [
                    'locales/*.js'
                ],
                dest: 'locales.js'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'numeral.js',
                'locales/*.js'
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
