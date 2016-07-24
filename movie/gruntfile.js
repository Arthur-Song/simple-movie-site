/**
 * Created by Arthur on 2016/7/4.
 */
module.exports=function(grunt){
    /**
     * 初始化配置
     */
    grunt.initConfig({
        watch:{
            jade:{
                files:["app/views/**"],
                options:{
                    livereload:true
                }
            },
            js:{
                files:["public/js/**","app/models/**","app/schemas/**"],
                //tasks:["jshint"],
                options:{
                    livereload:true
                }
            }
        },
        nodemon:{
            dev:{
                options:{
                    file:"./bin/www",
                    args:[],
                    ignoredFiles:["README.md","node_modules/**"],
                    watchedExtensions:["js"],
                    watchedFolders:["config/**","app/**","bin/**"],
                    debug:true,
                    delayTime:1,
                    env:{
                        PORT:3000
                    },
                    cwd:__dirname
                }
            }
        },
        concurrent:{
            tasks:["nodemon","watch"],
            options:{
                logConcurrentOutput:true
            }
        }
    });
    /**
     * 加载插件
     */
    grunt.loadNpmTasks("grunt-contrib-watch");
    //实时监听app.js 重启服务器
    grunt.loadNpmTasks("grunt-nodemon");
    //针对sass,less,stylus...等需要编译的
    grunt.loadNpmTasks("grunt-concurrent");
    /**
     * 设置grunt不要因为语法错误而中断grunt服务
     */
    grunt.option("force",true);
    /**
     * 注册默认任务
     */
    grunt.registerTask("default",["concurrent"]);
};