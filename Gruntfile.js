var fs = require('fs');

module.exports = function(grunt) {

    var minifiedFiles = {
            'min/numeral.min.js' : [
                'numeral.js'
            ],
            'min/locales.min.js': [
                'locales.js'
            ],
            'min/numeral-with-locales.min.js': [
                'numeral-with-locales.js'
            ]
        };

    // all the lang files need to be added manually
    fs.readdirSync('./src/locales').forEach(function (path) {
        var file = path.slice(0, -3),
            destination = 'min/locales/' + file + '.min.js',
            src = ['src/locales/' + path];

        minifiedFiles[destination] = src;
    });

    grunt.initConfig({
        mochaTest : {
            all: [
                'tests/numeral.js',
                'tests/formats/*.js',
                'tests/locales/*.js'
            ]
        },
        karma: {
            options: {
                files: [
                    'src/numeral.js',
                    'src/formats/*.js',
                    'src/locales/*.js',
                    'tests/numeral.js',
                    'tests/formats/*.js',
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
            numeral: {
                src: [
                    'src/numeral.js',
                    'src/formats/*.js'
                ],
                dest: 'numeral.js'
            },
            locales: {
                src: [
                    'src/locales/*.js'
                ],
                dest: 'locales.js'
            },
            numeralWithLocales: {
                src: [
                    'src/numeral.js',
                    'src/formats/*.js',
                    'src/locales/*.js'
                ],
                dest: 'numeral-with-locales.js'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'src/**/*.js'
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
