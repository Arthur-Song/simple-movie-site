/**
 * Created by Arthur on 2016/7/4.
 */
var mongoose=require("mongoose");
var bcrypt=require("bcryptjs");
var SALT_WORK_FACTOR=10; //生成盐所需时间

var UserSchema=new mongoose.Schema({
    username:{
        unique:true,
        type:String
    },
    password:String,
    email:String,
    /**
     * 0: normal user
     * 1: verified user
     * 2: professional user
     * >10: admin
     * >50: super admin
     */
    role:{
        type:Number,
        default:0
    },
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

UserSchema.pre("save",function(next){
    var user=this;
    if(this.isNew){
        this.meta.createAt = this.meta.lastModified = Date.now();
    }else{
        this.meta.lastModified=Date.now();
    }
    //生成盐
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err){
            return next(err);
        }else{
            //获取哈希值
            bcrypt.hash(user.password,salt,function(err,hash){
                user.password=hash;
                next();
            });
        }
    });
});

/**
 * 绑定静态方法
 * @type {{list: Function, getById: Function}}
 */
UserSchema.statics={
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
/**
 * 绑定对象方法
 * @type {{}}
 */
UserSchema.methods={
    comparePassword:function(_password,cb){
        bcrypt.compare(_password,this.password,function(err,isMatch){
            if(err) return cb(err);
            cb(null,isMatch);
        });
    }
};

module.exports=UserSchema;