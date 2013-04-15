var fs = require('fs');

module.exports = function(grunt) {

    var minifiedFiles = {
            'min/numeral.min.js' : ['numeral.js']
        };

    // all the lang files need to be added manually
    fs.readdirSync('./languages').forEach(function (path) {
        if (path.indexOf('.js') > -1) {
            var destination = 'min/languages/' + path,
                src = ['languages/' + path];

            minifiedFiles[destination] = src;
        }
    });

    grunt.initConfig({
        qunit: {
            src: ['tests/**/*.html']
        },
        uglify : {
            my_target: {
                files: minifiedFiles
            },
            options: {
                preserveComments: 'some'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', 'qunit:src');

    // Travis CI task.
    grunt.registerTask('travis', ['test']);
};