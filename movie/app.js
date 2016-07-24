var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require("compression");
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);
var mongoose=require("mongoose");

var app = express();

var dbUrl="mongodb://localhost/arthur_test";
//连接数据库
mongoose.connect(dbUrl);

/**
 * 设置视图路径和视图模版引擎
 */
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

/**
 * 注册中间件
 */
app.use(compression()); //压缩报文，提高效率
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"movie",
  //将session存入mongodb中
  store:new mongoStore({
    url:dbUrl,
    collection:"sessions" //存入数据库的集合名
  })
}));
//绑定时间组建
app.locals.moment=require("moment");

/**
 * 加载路由配置
 */
require("./config/routes")(app,mongoose,logger);

module.exports = app;
