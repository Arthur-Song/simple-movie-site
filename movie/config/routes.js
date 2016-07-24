/**
 * Created by Arthur on 2016/7/5.
 */
var indexes=require("../app/controllers/index");
var admins=require("../app/controllers/admin");
var users=require("../app/controllers/user");
var permissions=require("../app/controllers/permission");
var comments=require("../app/controllers/comment");

module.exports=function(app,mongoose,logger){
    /**
     * 验证用户是否登录
     */
    app.use(function(req , res , next){
        console.log("check user status...");
        var _user=req.session.user;
        if(_user){
            app.locals.user=_user;
        }
        next();
    });
    //分配路由
    app.use("/",indexes);
    app.use("/admin",permissions.loginRequired,permissions.adminRequired,admins);
    app.use("/user",users);
    app.use("/comment",permissions.loginRequired,comments);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers
    if (app.get('env') === 'development') {
        //设置数据库为debug模式
        mongoose.set("debug",true);
        //设置日志记录
        app.use(logger(":method:url:status"));
        //设置输出的html样式
        app.locals.pretty=false;
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

};