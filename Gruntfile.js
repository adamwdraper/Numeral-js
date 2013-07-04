var fs = require('fs');

module.exports = function(grunt) {

    var minifiedFiles = {
            'min/numeral.min.js' : ['numeral.js']
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
            my_target: {
                files: minifiedFiles
            },
            options: {
                preserveComments: 'some'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'moment.js',
                'languages/**/*.js'
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
                'strict': false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', [
        'jshint',
        'nodeunit'
    ]);

    // P
    grunt.registerTask('release', [
        'jshint',
        'nodeunit',
        'uglify'
    ]);

    // Travis CI task.
    grunt.registerTask('travis', ['test']);
};