module.exports = function(grunt) {
    grunt.initConfig({
        qunit: {
            src: ['tests/**/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    
    grunt.registerTask('test', 'qunit:src');
};