<template>
    <div class="wrap">
        <BackHeader :configData = 'showTitle' style="showHeader"/>
        <div class="imgList" v-for ="(item,index) in arrVideoList" :key="index">
           <div class="listHeader">
               <li class="user">
                   <van-icon name="friends-o" style="font-size:0.2rem;padding-top:0.1rem;margin-right:0.05rem"/>
                    {{item.author}}
               </li>
               <li class="time">
                    <van-icon name="underway-o" style="font-size:0.2rem;padding-top:0.1rem;margin-right:0.05rem"/>
                       {{item.videoTime}}
               </li>
           </div>
           <div class="imgWrap">
               <video :src= item.videoUrl
                          width="100%"
                          controls="controls"
                          webkit-playsinline="true"
                          x5-video-orientation="portraint" 
                          x5-video-player-type="h5" 
                ></video>
           </div>
       </div>
    </div>
    
</template>
<script>
import BackHeader from '@/components/header/backHeader.vue'
import {queryVideoList} from '@/api/login'
import {getUsername} from '@/utils/cookie.js';
import { Toast  } from 'vant';
export default {
    components:{BackHeader},
    data() {
        return {
            showTitle:'视频列表',
            arrVideoList:[],
        }
    },
    methods:{
        queryInfo(){
            queryVideoList().then(res=>{
                this.arrVideoList =res.data.data
            })
        }
    },
    mounted(){
       this.queryInfo()
    }
}
</script>
<style lang="scss" scoped>
.wrap{
  margin-bottom: 0.8rem;

.imgList{
    width: 94%;
    margin: 0.1rem auto;
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
    .imgWrap{
       img{
           width: 100%;
       }
    }
  }
      
}
</style>


