/**
 * Created by Arthur on 2016/7/6.
 */
var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var objectId=Schema.Types.ObjectId;

var CommentSchema=new Schema({
    movie:{
        type:objectId,
        ref:"Movie"
    },
    from:{
        type:objectId,
        ref:"User"
    },
    to:{
        type:objectId,
        ref:"User"
    },
    content:String,
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
CommentSchema.pre("save",function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.lastModified = Date.now();
    }else{
        this.meta.lastModified = Date.now();
    }
    next();
});

CommentSchema.statics={
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

module.exports=CommentSchema;