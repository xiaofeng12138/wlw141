<template>
  <div class="home">
    <div class="header">
        <img src="http://wlw141.xiaofenggege.com/imgBg.jpg" alt="">
    </div>
    <div class="form">
       <div class="title">
           <h2>物联网141照片集</h2>
       </div>
       <div class="login" v-if="showLogin">
            <van-form @submit="onSubmit">
                <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名："
                    placeholder="请输入您的用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码："
                    placeholder="请输入您的密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                    登  录
                    </van-button>
                </div>
            </van-form>
            <div class="noUsername">
                您还没有账号吗？请点击注册..
                 <van-button type="primary" style="width:1rem" @click=" showLogin = false">注  册</van-button>
            </div>
       </div>
       <div class="login" v-else>
            <van-form @submit="onSubmitReg">
                <van-field
                    v-model="regUsername"
                    name="用户名"
                    label="用户名："
                    placeholder="用户名推荐使用微信昵称~~"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="regPassword"
                    type="password"
                    name="密码"
                    label="密码："
                    placeholder="请输入您的密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                 <van-field
                    v-model="regrePassword"
                    type="password"
                    name="重复密码："
                    label="重复密码："
                    placeholder="请输入再次输入您的密码"
                    :rules="[{ required: true, message: '请填写重复密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                     注  册
                    </van-button>
                </div>
            </van-form>
            <div class="noUsername">
                您已经拥有账号，请点击登录..
                 <van-button type="primary" style="width:1rem" @click="showLogin = true">登  录</van-button>
            </div>
       </div>
    </div>

  </div>
</template>

<script>
import {Login,Reg} from '@/api/login'
import Time from '@/utils/time'
import { Toast } from 'vant';
import {setToken,setUsername,setUserId,getToken,setRegisterTime,setRole} from '@/utils/cookie'
export default {
    data(){
        return{
             showLogin:true,
             username: '',
             password: '',
             regUsername:'',
             regPassword:'',
             regrePassword:'',

        }
    },
    methods: {
        //登录函数
        onSubmit(values) {
            let data = {
                username:this.username,
                password:this.password
            }
            Login(data).then(res=>{
                if(res.data.code == '200'){
                    Toast({
                        message: '登陆成功',
                        icon: 'success',
                    });
                    setToken(res.data.token)
                    setUsername(res.data.username)
                    setRegisterTime(res.data.registerTime)
                    this.$router.push("/");
                }else{
                    Toast({
                      message: res.data.msg,
                      icon: 'cross',
                    });
                    return false
                }
            })
        },

        //注册函数
        onSubmitReg(values){
            if(this.regPassword != this.regrePassword ){
                Toast('密码和重复密码不一致！！');
                Toast({
                    message: '密码和重复密码不一致！！',
                    icon: 'cross',
                    });
                    return false
            }
            let data ={
                username:this.regUsername,
                password:this.regPassword,
                time:Time()
            }
            Reg(data).then(res=>{
                if(res.data.code == '200'){
                 Toast({
                    message: '注册成功，请登录！',
                    icon: 'success',
                    });
                    this.showLogin = true
                    this.regPassword = ''
                    this.regrePassword = ''
                    this.regUsername = ''
                }else{
                    Toast({
                      message: res.data.msg,
                      icon: 'cross',
                    });
                    return false
                }
            })
        }
    },
    
        
};
</script>
<style lang="scss" scoped>
.home{
   .header{
       height: 2.5rem;
       width: 100%;
       img{
           width: 100%;
           height: 2.5rem;
           opacity: 0.7;
          -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.4)));
       }
   }
   .form{
       height: 4rem;
       padding-top: 0.1rem;
       width: 90%;
       margin: auto;
       .title{
           text-align: center;
           font-size: 0.16rem;
           font-weight: bold;
           margin-bottom: 0.1rem;
       }
       .login{
           font-size: 0.16rem;
           height: 2.5rem;
           background-color: #fff;
       }
       .noUsername{
           height: 0.6rem;
           font-size: 0.16rem;
           line-height: 0.6rem;
       }
   }
}
</style>

