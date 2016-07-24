/**
 * Created by Arthur on 2016/7/6.
 */
var express=require("express");
var router=express.Router();
var Comment=require("../models/comment");

/**
 * 新增评论
 */
router.post("/save",function(req,res,next){
    var _comment=req.body;
    var movieId=_comment.movie;
    var comment=new Comment(_comment);
    comment.save(function(err,comment){
        if(err){
            return next(err);
        }
        res.redirect("/movie/"+movieId);
    });
});

module.exports=router;
