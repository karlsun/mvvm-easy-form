/**
 * Created by karlsun on 15/5/5.
 */

module.exports=function(grunt){
    var banner = [];
    banner.push("mvvm-easy-form v" + require("./package.json").version);
    banner.push("build date : "+grunt.template.today('yyyy-mm-dd'));

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "public/src",
                    mainConfigFile: "public/src/config.js",
                    name: "mvvm-easy-form",
                    out: "public/dist/mvvm-easy-form.src.js",
                    generateSourceMaps: true,
                    useStrict: true,
                    optimize: "none"
                }
            }
        },
        uglify: {
            options: {
                banner: "/*! \n * " + banner.join("\n *") + "\n */\n"
            },
            dist: {
                src: ['public/dist/mvvm-easy-form.src.js'],
                dest: 'public/dist/mvvm-easy-form.js'
            }
        },
        copy:{
            main:{
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src: ['public/dist/mvvm-easy-form.js', 'public/src/template.html'],
                        dest: 'public/javascripts/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['public/src/template.html'],
                        dest: 'public/dist/',
                        filter: 'isFile'
                    },
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['requirejs', 'uglify']);
    grunt.registerTask('example', ['requirejs', 'uglify', 'copy']);
}