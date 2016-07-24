/**
 * Created by Arthur on 2016/7/6.
 */
var mongoose=require("mongoose");
var CommentSchema=require("../schemas/comment");
var Comment=mongoose.model("Comment",CommentSchema);

module.exports=Comment;