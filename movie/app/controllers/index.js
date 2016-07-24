var express = require('express');
var router = express.Router();
var Movie=require("../models/movie");
var Comment=require("../models/comment");

/**
 *  首页
 */
router.get('/', function(req, res, next) {
  Movie.list(function(err,movies){
    if(err){
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    }else{
      res.render('pages/list', { title: '电影首页', movies:movies });
    }
  });
});

/**
 *  登录页面
 */
router.get('/login', function(req, res, next) {
  res.render('pages/user/login', { title: '登录'});
});

/**
 *  注册页面
 */
router.get('/register', function(req, res, next) {
  res.render('pages/user/register', { title: '注册' });
});


/**
 * 电影详情页
 */
router.get("/movie/:id",function(req, res, next){
  var id=req.params.id;
  Movie.getById(id,function(err,movie){
    if(err){
      return next(err);
    }else{
      //加载此电影的所有评论
      Comment.find({movie:id})
          .populate("from","username")
          .exec(function(err,comments){
            if(err){
              return next(err);
            }else{
              res.render('pages/detail', { title: '电影详情页', movie:movie ,comments:comments});
            }
          });
    }
  });
});

module.exports = router;
