module.exports = function(grunt){

    // configuration
    grunt.initConfig({
        //------------------------------------------------------------------------------------------------
        watch: { // for grunt.loadNpmTasks('grunt-contrib-watch');

            // files: ['<%= jshint.files %>'],
            // tasks: ['jshint']

            js: {  // a key, can be anything!
                files: ['assets/js/**/*.js'], // watch any js file in js folder
                tasks: ['concat:js'], // the task to run
            },

            css: {  // a key, can be anything!
                files: ['assets/css/**/*.css'], // watch any css file in css folder
                tasks: ['concat:css'], // the task to run
            },

            coffee: {  // a key, can be anything!
                files: ['assets/coffee/**/*.coffee'], // watch any coffeescript file in coffee folder
                tasks: ['coffee'], // the task to run
            },

            sass: {  // a key, can be anything!
                files: ['assets/sass/**/*.scss'], // watch any scss file in sass folder
                tasks: ['sass'], // the task to run
            },

            haml: {
                files: ['*.haml'], // watch any haml file in root folder
                tasks: ['haml'], // the task to run
            }
        },

        //------------------------------------------------------------------------------------------------
        concat: { // for grunt.loadNpmTasks('grunt-contrib-concat');
            js: {  // a key, can be anything!
                src: ['assets/js/**/*.js'], // a list of files
                dest: 'dist/js/scripts.js' // the destination file (the folder can be generated!)
            },
            css: {  // a key, can be anything!
                src: ['assets/css/**/*.css'], // a list of files
                dest: 'dist/css/styles.css' // the destination file (the folder can be generated!)
            },
        },

        //------------------------------------------------------------------------------------------------
        coffee: { // for grunt.loadNpmTasks('grunt-contrib-coffee');
            compile: {
                files: {
                    // destination file : ['file1.coffee', 'file2.coffee']
                    'assets/js/file3.js': ['assets/coffee/**/*.coffee']
                }
            }
        },

        //------------------------------------------------------------------------------------------------
        sass: { // for grunt.loadNpmTasks('grunt-contrib-sass');
            dist: {
                options: {
                    sourcemap: 'none' // dont generate the sourcemap file
                },
                files: {
                    // destination file : ['file1.scss', 'file2.scss']
                    'assets/css/file3.css': ['assets/sass/**/*.scss']
                }
            }
        },

        //------------------------------------------------------------------------------------------------
        haml: {  // for grunt.loadNpmTasks('grunt-haml2html');
            dist: {
                files: {
                    // 'destination': source files
                    'index2.html': ['index2.haml']
                }
            }
        },

        //------------------------------------------------------------------------------------------------
        // jshint: {
        //     files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        //     options: {
        //         globals: {
        //             jQuery: true
        //         }
        //     }
        // },

        //------------------------------------------------------------------------------------------------
    });

    // // an example of a simple task
    // grunt.registerTask('speak', function(){
    //     // $ grunt speak
    //     console.log('I am speaking');
    // });

    // // an example of a simple task
    // grunt.registerTask('yell', function(){
    //     // $ grunt yell
    //     console.log('I am YELLING');
    // });

    // // an example of a simple task combination
    // // $ grunt doBoth
    // grunt.registerTask('doBoth', ['speak', 'yell']);

    // // the default task
    // // $ grunt
    // grunt.registerTask('default', ['speak', 'yell']);


    // $ npm instal grunt-contrib-concat --save-dev
    // $ grunt concat  # executes all sub tasks
    // $ grunt concat:js # executes js sub tasks
    // $ grunt concat:css # executes css sub tasks
    grunt.loadNpmTasks('grunt-contrib-concat');


    // $ npm instal grunt-contrib-watch --save-dev
    // $ grunt watch  # executes all sub tasks
    // $ grunt watch:js # executes js sub tasks
    // $ grunt watch:css # executes css sub tasks
    grunt.loadNpmTasks('grunt-contrib-watch');


    // $ npm instal grunt-contrib-coffee --save-dev
    // $ grunt coffee
    grunt.loadNpmTasks('grunt-contrib-coffee');


    // $ npm install grunt-haml2html --save-dev
    // $ grunt haml
    grunt.loadNpmTasks('grunt-haml2html');

    // $ npm instal grunt-contrib-sass --save-dev
    // $ grunt sass
    grunt.loadNpmTasks('grunt-contrib-sass');


    // // other grunt tasks to consider!
    // grunt-contrib-livereload
    // grunt-init-gruntfile
    // grunt-init
    // grunt-init-commonjs-sample


    // // Validate files
    // // $ npm instal grunt-contrib-jshint --save-dev
    // // $ grunt jshint
    // grunt.loadNpmTasks('grunt-contrib-jshint');


    // // minify files
    // // $ npm instal grunt-contrib-uglify --save-dev
    // // $ grunt uglify
    // grunt.loadNpmTasks('grunt-contrib-uglify');

    // the default task
    // $ grunt # runs the specified tasks
    // its best to let 'concat' and 'watch' task in the end of the list
    grunt.registerTask('default', ['coffee', 'haml', 'sass', 'concat', 'watch']);


};