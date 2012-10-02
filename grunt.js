module.exports = function(grunt) {
    var version = require('./package.json').version;
    var sources = [
        './lib/runie.js'
    ];

    grunt.initConfig({
        lint: {
            files : sources
        },
        min: {
            dist: {
                src: sources,
                dest: 'runie-' + version + '.min.js'
            }
        }
    });

    grunt.registerTask('default', 'lint min');
};