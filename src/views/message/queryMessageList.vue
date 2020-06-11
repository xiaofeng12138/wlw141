<template>
    <div class="message">
        <Header :configData="bannerTitle" />
        <div class="noInfo" v-if="messageList.length == 0">
            <van-empty description="您还未留过言~~" />
        </div>
        <div class="list" v-else v-for="(item,index) in messageList" >
            <div class="listHeader">
               <li class="user">
                   <van-icon name="friends-o" style="font-size:0.2rem;padding-top:0.1rem;margin-right:0.05rem"/>
                  {{item.author}}
               </li>
               <li class="time">
                    <van-icon name="underway-o" style="font-size:0.2rem;padding-top:0.1rem;margin-right:0.05rem"/>
                       {{item.time}}
               </li>
           </div>
            <van-field
                v-model="item.messageContent"
                rows="1"
                autosize
                type="textarea"
                disabled
            />
            <div class="delbtn">
                <van-button type="danger" block size="small" style="width:0.5rem;" @click="delMessage(item._id)">删 除</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header/backHeader.vue'
import {queryMsByid,delMessages} from '@/api/login.js'
import {getUsername} from '@/utils/cookie.js'
import { Dialog,Toast } from 'vant';
export default {
     components:{Header},
     data(){
         return{
             bannerTitle:"留言管理",
             messageList:[],
             messageContent:""
         }
     },
     methods:{
         queryInfo(){
             let data = {
                 username:getUsername()
             }
             queryMsByid(data).then(res=>{
                 this.messageList = res.data.data
             })
         },
         delMessage(id){
             Dialog.confirm({
                title: '提示',
                message: '您确认删除当前留言吗？',
                }).then(() => {
                    delMessages({id:id}).then(res=>{
                        if(res.data.code == '200'){
                            Toast({
                                message: res.data.msg,
                                icon: 'success',
                            });
                            this.queryInfo()
                        }else{
                             Toast({
                                message: res.data.msg,
                                icon: 'cross',
                                });
                                return false
                            }
                    })
                })
                .catch(() => {
                });
         }
     },
     mounted(){
        this.queryInfo()
     }
}
</script>

<style lang="scss" scoped>
.message{
    margin-bottom: 0.7rem;
    .list:last-child{
        margin-bottom: 0.7rem;
    }
    .list{
        width: 90%;
        margin: 0.2rem auto;
        border: 2px solid #f1f1f1;
      .listHeader{ 
        height: 0.4rem;
        display: flex;
        background-color: #f1f1f1;
        li{
          display: flex;
          font-size: 0.16rem; 
          line-height: 0.4rem;
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
      .delbtn{
          margin: 0.1rem 0 0.1rem 0.1rem;
      }
    }
}
</style>

