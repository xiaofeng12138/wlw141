<template>
    <div class="message">
        <Header :configData="bannerTitle" />
        <div class="addMessage">
             <van-button type="info" block  round  to="addMessage">添加留言</van-button>
        </div>
        <div class="list" v-for="(item,index) in messageList">
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
        </div>
            <van-pagination
                v-model="currentPage"
                :total-items="total"
                :show-page-size="3"
                force-ellipses
                @change="changePage"
                />
    </div>
</template>

<script>
import Header from '@/components/header/header.vue'
import {QueryMessage} from '@/api/login.js'
export default {
     components:{Header},
     data(){
         return{
             bannerTitle:"留言板",
             messageList:[],
             total:0,
             currentPage:1
            
         }
     },
     methods:{
         changePage(page){
                let data = {
                    page
                }
               QueryMessage(data).then(res=>{
                 this.messageList = res.data.data
                 this.total = res.data.count
             })
         },
         QueryMessageList(page){
             let data ={
                 page
             }
             QueryMessage(data).then(res=>{
                 this.messageList = res.data.data
                 this.total = res.data.count
             })
         }
     },
     mounted(){
         this.QueryMessageList(1)
     }
}
</script>

<style lang="scss" scoped>
.message{
    margin-bottom: 0.7rem;
    .addMessage{
        width: 90%;
        margin: 0.1rem auto;
    }
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
    }
}
</style>

