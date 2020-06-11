<template>
    <div class="personalWrap">
        <Header :configData="bannerTitle"/>
        <div class="personalHeader">
            <div class="listHeader">
               <li class="user">
                   <van-icon name="friends-o" style="font-size:0.2rem;padding-top:0.1rem;margin-right:0.05rem"/>
                   {{userName}}
               </li>
               <li class="time">
                    <van-icon name="underway-o" style="font-size:0.2rem;padding-top:0.1rem;margin-right:0.05rem"/>
                      {{regTime}}
               </li>
           </div>
           <div class="motto">
               没有穷人,只有懒人,多走一步,可定成败
           </div>
           <div class="meunList">
                <van-cell title="用户查询" icon="friends-o"  is-link @click="goUser" v-if="showRole"/>
                <van-cell v-for="(item,index) in meunList" :title="item.titile" :icon="item.icon" :key="index" is-link @click="goUrl(item)"/>
                
           </div>
        </div>
        
    </div>
</template>

<script>
import Header from '@/components/header/header.vue'
import {getUsername,getRegisterTime,setToken,setUsername,getRole} from '@/utils/cookie.js'
import { Dialog,Toast } from 'vant';
export default {
    components:{Header},
    data() {
        return {
            showRole:'',
            bannerTitle:"个人中心",
            userName:getUsername(),
            regTime:getRegisterTime(),
             meunList:[
                {
                    titile:'留言管理',
                    icon:'comment-o',
                    url:'/queryMessageList',
                },
                 {
                    titile:'照片管理',
                    icon:'photo-o',
                    url:'/queryImgList',
                },
                {
                    titile:'视频管理',
                    icon:'video-o',
                    url:'/videoManger',
                },
                 {
                    titile:'班级视频',
                    icon:'send-gift-o',
                    url:'/videoList'
                },
                 {
                    titile:'退出登录',
                    icon:'location-o',
                    url:'/logout'
                }
            ]
        }
    },

    methods:{
        goUrl(item){
            if(item.url == '/logout'){
                 Dialog.confirm({
                    title: '提示',
                    message: '您确认退出吗？',
                    }).then(() => {
                       setToken('')
                       setUsername('')
                       this.$router.push('/login')
                    })
                    .catch(() => {
                    });
            }else{
               this.$router.push(item.url)
            }
            
        },
        goUser(){
          this.$router.push('/userList')  
        }
    },
    mounted(){
       if( getUsername() == 'xiaofeng'){
            this.showRole = '100'
       }else{
           this.showRole = ''
       }
    }
}
</script>

<style lang="scss" scoped>
.personalWrap{
    height: 100vh;
    background-color: #f1f1f1;
   .personalHeader{
       height: 0.9rem;
       width: 94%;
       margin: 0.1rem auto;
       border: 2px solid #fff;
       .listHeader{
            height: 0.45rem;
            display: flex;
            background-color: #f1f1f1;
            border-bottom: 1px solid #fff;
            li{
            display: flex;
            font-size: 0.16rem; 
            line-height: 0.45rem;
            justify-content: center;
            color: #185ABD;
            }
            .user{
                flex: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .time{
                flex: 3;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
       }
       .motto{
           height: 0.4rem;
           font-size: 0.13rem;
           background-color: #f1f1f1; 
           line-height: 0.4rem;
           text-align: center;
           color: #185ABD;
       }
       .meunList{
           margin-top: 0.2rem;
           height: 2rem;
       }

        
       
   } 
   
}
</style>


