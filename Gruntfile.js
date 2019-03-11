module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concatDirs: {
            source: "src/scripts",
            destination: "dist/scripts.js"
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "src",
                        src: "**.html",
                        dest: "dist/"
                    }
                ]
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel/preset-env']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**.js'],
                        dest: 'build/'
                    }
                ]
            }     
        },
        concat: {
            basic: {
                src: ["<%=concatDirs.source%>/**.js"],
                dest: '<%=concatDirs.destination%>' 
            }
          },
        clean: ["dist", "build" ]
    });

    /*For the babel task.*/
    grunt.loadNpmTasks('grunt-babel');
    /*For the copy task.*/
    grunt.loadNpmTasks('grunt-contrib-copy');
    /*For the clean task.*/
    grunt.loadNpmTasks('grunt-contrib-clean');
    /*For the concat task.*/
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Load the plugin that provides the "uglify" task.

    grunt.registerTask('test', ['concat' ]);
    // Default task(s).
    grunt.registerTask('default', ['clean', 'babel', 'copy', 'concat']);

};
