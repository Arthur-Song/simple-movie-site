var express = require('express');
var router = express.Router();
var Movie=require("../models/movie");
var _=require("underscore");
var moment=require("moment");


/* 加载电影操作列表 */
router.get('/movie/list', function(req, res, next) {
  Movie.find(function(err,movies){
    if(err){
      next(err);
    }else{
      res.render("pages/admin/list",{title:"后台电影列表",movies:movies});
    }
  });
});

router.get('/movie/add', function(req, res, next) {
  res.render("pages/admin/add",{title:"后台电影录入",movie:{}})
});
/**
 * 执行保存和修改
 */
router.post("/movie/save",function(req , res , next){
  var id=req.body._id;
  var movieObj=req.body;
  var _movie={};
  if(id !== "undefined"){
    //执行修改操作
    Movie.getById(id,function(err,movie){
      if(err){
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: {}
        });
      }else{
        _movie = _.extend(movie , movieObj);
        _movie.save(function(err,movie){
          if(err){
            next(err);
          }else{
            res.redirect("/movie/"+movie._id);
          }
        });
      }
    });
  }else{
    //执行新增操作
    _movie=new Movie({
      title:movieObj.title,
      director:movieObj.director,
      actors:movieObj.actors.split(","),
      country:parseInt(movieObj.country),
      language:parseInt(movieObj.language),
      publishDate:new Date(moment(movieObj.publishDate,"YYYY-MM-DD").unix(Number)),
      tags:movieObj.tags.split(","),
      summary:movieObj.summary,
      flash:movieObj.flash,
      poster:movieObj.poster
    });
    _movie.save(function(err,movie){
      if(err){
        next(err);
      }else{
        res.redirect("/movie/"+movie._id);
      }
    });
  }
});
/**
 * 准备数据，跳转到电影更新页
 */
router.get("/movie/edit/:id",function(req , res , next){
  var id=req.params.id;
  if(id){
    Movie.getById(id,function(err,movie){
      res.render("pages/admin/add",{title:"编辑电影信息",movie:movie});
    });
  }
});

router.delete("/movie/delete",function(req,res,next){
  var id=req.query.id;
  if(id){
    Movie.remove({_id:id},function(err,movie){
      if(err){
        next(err);
      }else{
        res.json({success:1});
      }
    });
  }
});

module.exports = router;
