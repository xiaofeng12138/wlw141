const mongoose = require('mongoose')

const crypto = require('crypto'); //密码加密模块

mongoose.connect('mongodb://127.0.0.1:27017/wlw',{ useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('open',()=>{
    console.log('数据库连接成功')
})
mongoose.connection.on('error',()=>{
    console.log('数据库连接失败')
})

//设置用户的Schema
let userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    time:{type:String,required:true} //用户注册时间
},{
  versionKey:false
 })

 //设置留言的Schema
let messageSchema = new mongoose.Schema({
    author:{type:String,required:true},
    messageContent:{type:String,required:true},
    time:{type:String,required:true} //留言发表时间
},{
  versionKey:false
 })

  //设置上传图片的Schema
let imgSchema = new mongoose.Schema({
    author:{type:String,required:true}, //上传人
    imgType:{type:String,required:true},//上传相册
    imgTime:{type:String,required:true} ,//上传时间
    imgUrl:{type:String,required:true},//上传图片地址
},{
  versionKey:false
 })

  //设置上传视频的Schema
let videoSchema = new mongoose.Schema({
    author:{type:String,required:true}, //上传人
    videoTime:{type:String,required:true} ,//上传时间
    videoUrl:{type:String,required:true},//上传视频地址
},{
  versionKey:false
 })

 const User = mongoose.model('user',userSchema)
 
 const Message = mongoose.model('message',messageSchema)
 const Img = mongoose.model('imgs',imgSchema)
 const Video = mongoose.model('video',videoSchema)


const Models = { User,Message,Img,Video}

module.exports = Models;