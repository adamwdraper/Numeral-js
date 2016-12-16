module.exports = function(grunt) {

    var compileFile = function() {
            var type = this.data.type;
            var template = grunt.file.read('templates/types.js');
            var anon = grunt.file.read('templates/anon.js');
            var files =  grunt.file.expand([
                'src/' + type + '/*.js'
            ]);
            var regexp = /}\(this, function \(numeral\) {\s([\s\S]+)(?:\s}\)\);)/;
            var content = '';
            var file;
            var i;

            for (i = 0; i < files.length; i++) {
                file = grunt.file.read(files[i]);

                content += '\n' + grunt.template.process(anon, {
                    data: {
                        content: file.match(regexp)[1]
                    }
                }) + '\n';
            }

            grunt.file.write('temp/' + type + '.js', grunt.template.process(template, {
                data: {
                    type: type,
                    content: content
                }
            }));
        };

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
        compile: {
            locales: {
                type: 'locales'
            },
            formats: {
                type: 'formats'
            }
        },
        uglify: {
            min: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            'locales/*.js'
                        ],
                        dest: 'min/',
                        ext: '.min.js'
                    },
                    {
                        expand: true,
                        src: [
                            'numeral.js',
                            'locales.js'
                        ],
                        dest: 'min/',
                        ext: '.min.js'
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
                    'temp/formats.js'
                ],
                dest: 'numeral.js'
            },
            locales: {
                src: [
                    'temp/locales.js'
                ],
                dest: 'locales.js'
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
                'quotmark': 'single',
                'globals': {
                    'define': true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build:locales', function() {
        var template = grunt.file.read('templates/locales.js');
        var anon = grunt.file.read('templates/anon.js');
        var files =  grunt.file.expand([
            'src/locales/*.js'
        ]);
        var regexp = /}\(this, function \(numeral\) {\s([\s\S]+)(?:\s}\)\);)/;
        var content = '';
        var file;
        var i;

        for (i = 0; i < files.length; i++) {
            file = grunt.file.read(files[i]);

            content += '\n' + grunt.template.process(anon, {
                data: {
                    content: file.match(regexp)[1]
                }
            }) + '\n';
        }

        grunt.file.write('locales.js', grunt.template.process(template, {
            data: {
                content: content
            }
        }));
    });

    grunt.registerMultiTask('compile', compileFile);

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
        'compile',
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
