/**
 * Created by Arthur on 2016/7/3.
 */
var mongoose=require("mongoose");

var MovieSchema=new mongoose.Schema({
    title:String,
    director:String,
    actors:Array,
    country:Number,
    language:String,
    publishDate:Date,
    tags:Array,
    summary:String,
    flash:String,
    poster:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        lastModified:{
            type:Date,
            default:Date.now()
        }
    }
});
/**
 * 每次存储数据之前将会调用此方法
 */
MovieSchema.pre("save",function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.lastModified = Date.now();
    }else{
        this.meta.lastModified = Date.now();
    }
    next();
});

MovieSchema.statics={
    list:function(cb){
        return this.find({})
            .sort("meta.lastModified")
            .exec(cb);
    },
    getById:function(id,cb){
        return this.findOne({_id:id})
            .exec(cb);
    }
};

module.exports=MovieSchema;
