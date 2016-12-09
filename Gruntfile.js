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

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        mochaTest : {
            all: {
                src: [
                    'build/tests/**/*.js'
                ]
            }
        },
        karma: {
            options: {
                files: [
                    'build/src/**/*.js',
                    'build/tests/**/*.js'
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
            minified: {
                files: [
                    {
                        expand: true,
                        src: [
                            'build/src/**/*.js'
                        ],
                        dest: 'min/'
                    }
                ]
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
                'jshintrc': true
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            build: {
                files: [
                    {
                        expand: true,
                        src: [
                            'src/**/*.js',
                            'tests/**/*.js'
                        ],
                        dest: 'build/'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'test'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'babel:build'
    ]);

    grunt.registerTask('test', [
        'build',
        'mochaTest',
        'karma:local'
    ]);

    grunt.registerTask('test:npm', [
        'build',
        'mochaTest'
    ]);

    grunt.registerTask('test:browser', [
        'build',
        'karma:local'
    ]);

    grunt.registerTask('dist', [
        'concat',
        'uglify'
    ]);

    // Travis CI task.
    grunt.registerTask('travis', [
        'build',
        'mochaTest',
        'karma:ci'
    ]);
};
