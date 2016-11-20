module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                files: {
                    'css/dev/style.css': 'scss/style.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/build/style.css': 'scss/style.scss'
                }
            }
        },
        watch: {
            files: 'scss/**/*',
            tasks: [
                'sass:dev'
            ]
        },
        uglify: {
            build: {
                files: {
                    'js/min/site.min.js': [
                        'js/respond.js',
                        'js/numeral.js',
                        'js/languages.js',
                        'js/site.js'
                    ]
                }
            }
        },
        jshint: {
            all: [
                'js/site.js'
            ],
            options: {
                node: true,
                browser: true,
                curly: true,
                devel: false,
                eqeqeq: true,
                eqnull: true,
                newcap: true,
                noarg: true,
                sub: true,
                globals: {
                    define: false,
                    requirejs: false
                },
                strict: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [
        'sass:dev',
        'watch'
    ]);

    grunt.registerTask('build', [
        'sass:build',
        'jshint',
        'uglify:build'
    ]);

    grunt.registerTask('travis', [
        'build'
    ]);
};
