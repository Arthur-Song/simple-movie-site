/**
 * Created by Arthur on 2016/7/3.
 */
var mongoose=require("mongoose");
var MovieSchema=require("../schemas/movie");
var Movie=mongoose.model("Movie",MovieSchema);

module.exports=Movie;