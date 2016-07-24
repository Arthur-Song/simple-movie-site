/**
 * Created by Arthur on 2016/7/6.
 */

/**
 * 登录验证
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.loginRequired=function(req,res,next){
    var user=req.session.user;
    if(!user){
        return res.redirect("/login");
    }
    next();
};
/**
 * 管理员权限验证
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.adminRequired=function(req,res,next){
    var　user=req.session.user;
    if(user.role<=10){
        return res.redirect("/");
    }
    next();
};
/**
 * 验证是否为超级管理员
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.superAdminRequired=function(req,res,next){
    var　user=req.session.user;
    if(user.role<=50){
        return res.redirect("/");
    }
    next();
};