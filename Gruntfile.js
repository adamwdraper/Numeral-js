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
    fs.readdirSync('./locale').forEach(function (path) {
        var file = path.slice(0, -3),
            destination = 'min/locale/' + file + '.min.js',
            src = ['locale/' + path];

        minifiedFiles[destination] = src;
    });

    grunt.initConfig({
        nodeunit : {
            all : ['tests/**/*.js']
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
                    'locale/**/*.js'
                ],
                dest: 'locales.js'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'numeral.js',
                'locale/**/*.js'
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

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', [
        'test'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'nodeunit'
    ]);

    // P
    grunt.registerTask('build', [
        'jshint',
        'nodeunit',
        'concat',
        'uglify'
    ]);

    // Travis CI task.
    grunt.registerTask('travis', ['test']);
};
