/**
 * Created by Arthur on 2016/7/4.
 */
var express=require("express");
var router=express.Router();
var User=require("../models/user");
var permissions=require("./permission");

/**
 * 加载所有用户列表
 */
router.get("/list",permissions.loginRequired,permissions.adminRequired,function(req , res , next){
    User.list(function(err,users){
        if(err){
            next(err);
        }else{
            res.render("pages/user/list",{title:"用户列表",users:users});
        }
    });
});
/**
 * 用户注册
 */
router.post("/register",function(req , res , next){
    var _user=req.body;
    //判断用户名是否被注册过
    User.find({username:_user.username},function(err,users){
        if(err){
            next(err);
        }else{
            if(users){
                return res.redirect("/");
            }else{
                //不存在用户名
                var user=new User(_user);
                user.save(function(err,user){
                    if(err){
                        next(err);
                    }else{
                        res.redirect("/user/list");
                    }
                });
            }
        }
    })
});
/**
 * 用户登录
 */
router.post("/login",function(req , res , next){
    var _user=req.body;
    User.findOne({username:_user.username},function(err,user){
        if(err) return next(err);
        if(!user){
            return res.redirect("/");
        }else{
            //匹配密码是否正确
            user.comparePassword(_user.password,function(err,isMatched){
                if(err) return next(err);
                if(isMatched){
                    req.session.user=user;
                    return res.redirect("/user/list");
                }else{
                    return res.redirect("/");
                }
            })
        }
    })
});
/**
 * 用户退出登录
 */
router.get("/logout",function(req,res,next){
    delete req.session.user;
    delete req.app.locals.user;
    res.redirect("/");
});

module.exports=router;