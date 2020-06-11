const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const db = require('./db')
const session = require('express-session')
const jwt = require("jsonwebtoken");
const path = require('path');
const qiniu = require('qiniu');
const crypto = require('crypto'); //密码加密模块

// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//设置允许跨域访问该服务.

app.all('*', function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   res.header('Access-Control-Allow-Methods', '*');
   res.header('Content-Type', 'application/json;charset=utf-8');
   next();
 });


//注册模块
app.use('/reg',(req,res)=>{
    let { username,password,time} = req.body;
    db.User.findOne({username}).then((users)=>{
       if(users){
          res.send({msg:'用户名已存在',code:'500'})
          return
       }else{
           //密码加密
          const c = crypto.createHash('sha256');
          const password = c.update(req.body.password).digest('hex');
          res.send({msg:'注册成功',code:'200'})
          db.User.create({
             username,
             password,
             time
          })
       }
    })
 })

 

//登录模块
app.use('/login',(req,res,next)=>{
    let { username,password } = req.body;
    const c = crypto.createHash('sha256');
    const newPsd = c.update(req.body.password).digest('hex');
  
    db.User.findOne({username}).then(r=>{
       if(r){
          let psd = r.password;
          if(newPsd != psd){
           res.send({msg:'密码错误',code:'500'})
           return false
          }else{
                 let userId = r._id;
                 let content = r.username
                 let registerTime = r.time
                 let secretOrPrivateKey = "123456" // 这是加密的key（密钥） 
                 let  token = jwt.sign({
                    content,
                    secretOrPrivateKey
                }, 'my_token', { expiresIn:  60*60*0.5 });
                res.send({msg:'登录成功',code:'200',token:token,username:content,registerTime:registerTime})
          }
  
       }else{
        res.send({msg:'用户名不存在，请注册后在登录',code:'500'})
        return false
       }
    })
  })

//添加留言模块
app.use('/addMessage',(req,res)=>{
   let { author,messageContent,time } = req.body;
   db.User.find({username:author},(err,docs)=>{
     if(err){
      res.send({msg:'服务器错误，请重试',code:'500'})
      return
     }
     if(docs.length == '0'){
        res.send({msg:'该用户不存在请注册后再发布',code:'500'})
        return
     }else{
      db.Message.create({
         author,
         messageContent,
         time,
      }).then((resp)=>{
           res.send({msg:'留言发表成功',code:'200'})
      }).catch((err)=>{
         res.send({msg:'留言发表失败',code:'500'})
      })
     }
   })
})

//留言返回查询接口
app.use('/queryMessage',(req,res)=>{
   let count = 0
   db.Message.find().countDocuments().then((r)=>{
     count = r
     let page = req.body.page ;
     if(req.body.author){
         let author = req.body.author
         db.Message.find().populate({'author':author})
         .sort({time:-1})
         .skip(10*(page - 1))  //跳过多少页
         .limit(10)            //每页显示几条
         .then((resp)=>{
            res.send({data:resp,msg:'请求成功',code:'200',count})
         }).catch((err)=>{
            res.send({msg:'请求失败',code:'500'})
            return err;
         })
     }else{
         db.Message.find()
         .sort({time:-1})
         .skip(10*(page - 1))  //跳过多少页
         .limit(10)            //每页显示几条
         .then((resp)=>{
            res.send({data:resp,msg:'请求成功',code:'200',count})
         }).catch((err)=>{
            res.send({msg:'请求失败',code:'500'})
            return err;
         })
     }
     }).catch((err)=>{
        res.send({msg:'请求失败',code:'500'})
        return err
     }) 
})

//获取七牛云token秘钥
app.use('/getToken',(req,res)=>{
   //获取七牛云的token
  var accessKey = 'DDinTpKdKIJi9NA0q2nMoJV-296wps2DYD5JUxb8';
  var secretKey = 'POvLMBoC-EnwHWvwaJVkCjzLVvYuGl9TOVnzBpRv';
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var options = {
     scope: 'wlw41',
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
   let token = uploadToken
   res.send({msg:'token获取成功',code:'200',token:token})
})

app.use('/upload',(req,res)=>{
    let { author,imgType,imgTime,imgUrl } = req.body;
    db.Img.create({
      author,
      imgType,
      imgTime,
      imgUrl
   }).then((resp)=>{
      res.send({msg:'图片上传成功',code:'200'})
   }).catch((err)=>{
      res.send({msg:'图片上传失败',code:'500'})
   })

})

//图片列表查询
app.use('/queryImg',(req,res)=>{
   let { imgType } = req.body;
   if(imgType){
   let count = 0
   db.Img.find({'imgType':imgType}).countDocuments().then((r)=>{
     count = r
     let page = req.body.page ;
     db.Img.find({'imgType':imgType})
         .sort({imgTime:-1})
         .skip(10*(page - 1))  //跳过多少页
         .limit(10)            //每页显示几条
         .then((resp)=>{
            res.send({data:resp,msg:'请求成功',code:'200',count})
         }).catch((err)=>{
            res.send({msg:'请求失败',code:'500'})
            return err;
         })
     }).catch((err)=>{
        res.send({msg:'请求失败',code:'500'})
        return err
     }) 
   }else{
      res.send({msg:'参数错误！！',code:'500'})
      return false
   }
})

//留言查询根据用户名查询
app.use('/queryMsByid',(req,res)=>{
  let {username} = req.body
   if(username){
      if(username == 'xiaofeng'){
         db.Message.find().sort({time:-1}).then(resp=>{
            res.send({data:resp,msg:'请求成功',code:'200'})
         }).catch((err)=>{
            res.send({msg:'请求失败',code:'500'})
            return err;
         })
      }else{
         db.Message.find({'author':username}).sort({time:-1}).then(resp=>{
            res.send({data:resp,msg:'请求成功',code:'200'})
         }).catch((err)=>{
            res.send({msg:'请求失败',code:'500'})
            return err;
         })
      }
   }else{
         res.send({msg:'参数错误',code:'500'})
         return err;
   }
})

//留言删除接口
app.use('/delMessage',(req,res)=>{
   let {id} = req.body
   db.Message.deleteOne({_id:id}).then((resp)=>{
      res.send({msg:'留言删除成功',code:'200'})
   }).catch((err)=>{
      res.send({msg:'留言删除失败',code:'500'})
      return err
   })
})

//图片列表根据用户查询
app.use('/queryImgByid',(req,res)=>{
   let {username} = req.body
    if(username){
       if(username == 'xiaofeng'){
          db.Img.find().sort({imgTime:-1}).then(resp=>{
             res.send({data:resp,msg:'请求成功',code:'200'})
          }).catch((err)=>{
             res.send({msg:'请求失败',code:'500'})
             return err;
          })
       }else{
          db.Img.find({'author':username}).sort({imgTime:-1}).then(resp=>{
             res.send({data:resp,msg:'请求成功',code:'200'})
          }).catch((err)=>{
             res.send({msg:'请求失败',code:'500'})
             return err;
          })
       }
    }else{
          res.send({msg:'参数错误',code:'500'})
          return err;
    }
 })

 //图片删除接口
app.use('/delImg',(req,res)=>{
   let {id} = req.body
   db.Img.deleteOne({_id:id}).then((resp)=>{
      res.send({msg:'照片删除成功',code:'200'})
   }).catch((err)=>{
      res.send({msg:'照片删除失败',code:'500'})
      return err
   })
})

//注册用户查询
app.use('/queryUser',(req,res)=>{
   db.User.find().sort({time:-1}).then(resp=>{
      res.send({data:resp,msg:'用户列表查询成功',code:'200'})
   }).catch((err)=>{
      res.send({msg:'用户列表查询失败',code:'500'})
      return err
   })
})

 //用户删除接口
 app.use('/delUser',(req,res)=>{
   let {id} = req.body
   db.User.findOne({_id:id}).then(resp=>{
      if(resp.username == 'xiaofeng'){
         res.send({msg:'超管无法删除',code:'500'})
         return false
      }else{
          db.User.deleteOne({_id:id}).then((resp)=>{
             res.send({msg:'用户删除成功',code:'200'})
           }).catch((err)=>{
           res.send({msg:'用户删除失败',code:'500'})
           return err
      })
      }
   })

})

//视频上传接口
app.use('/uploadVideo',(req,res)=>{
   let { author,videoTime,videoUrl } = req.body;
   db.Video.create({
     author,
     videoTime,
     videoUrl,
  }).then((resp)=>{
     res.send({msg:'视频上传成功',code:'200'})
  }).catch((err)=>{
     res.send({msg:'视频上传失败',code:'500'})
  })
})

//视频列表查询接口

app.use('/queryVideoList',(req,res)=>{
   if(req.body.author && req.body.author != 'xiaofeng'){
      let author = req.body.author
     db.Video.find({'author': author }).sort({videoTime:-1}).then(resp=>{
         res.send({data:resp,msg:'视频列表查询成功',code:'200'})
      }).catch((err)=>{
         res.send({msg:'视频列表查询失败',code:'500'})
         return err
      })
   }else{
      db.Video.find().sort({videoTime:-1}).then(resp=>{
         res.send({data:resp,msg:'视频列表查询成功',code:'200'})
      }).catch((err)=>{
         res.send({msg:'视频列表查询失败',code:'500'})
         return err
      })
   }
  
})

 //视频删除接口
 app.use('/delVideo',(req,res)=>{
   let {id} = req.body
   db.Video.deleteOne({_id:id}).then((resp)=>{
         res.send({msg:'视频删除成功',code:'200'})
      }).catch((err)=>{
       res.send({msg:'视频删除失败',code:'500'})
       return err
      })
})



app.listen(6032,()=>{
    console.log('项目启动成功，监听在6032端口！！！');
  });