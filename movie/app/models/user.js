/**
 * Created by Arthur on 2016/7/4.
 */
var mongoose=require("mongoose");
var UserSchema=require("../schemas/user");
var User=mongoose.model("User",UserSchema);

module.exports=User;