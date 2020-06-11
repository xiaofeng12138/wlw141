<template>
    <div class="wrap">
        <BackHeader :configData = 'showTitle' style="showHeader"/>
         <div class="noInfo" v-if="arrImgList.length == 0">
            <van-empty description="您还未上传图片~~" />
        </div>
       <div class="imgList" v-else  v-for="(item,index) in arrImgList" :key="index"  >
           <div class="listHeader">
               <li class="user">
                   <van-icon name="friends-o" style="font-size:0.2rem;padding-top:0.1rem;margin-right:0.05rem"/>
                      {{item.author}}
               </li>
               <li class="time">
                    <van-icon name="underway-o" style="font-size:0.2rem;padding-top:0.1rem;margin-right:0.05rem"/>
                    {{item.imgTime}}
               </li>
           </div>
           <div class="imgWrap"  >
             <img v-lazy="item.imgUrl" alt="" @click="imgZoom(item,index)">
           </div>
            <div class="delbtn">
                <van-button type="danger" block size="small" style="width:0.5rem;" @click="delImgList(item._id)" >删 除</van-button>
            </div>
       </div>
    </div>
    
</template>
<script>
import BackHeader from '@/components/header/backHeader.vue'
import {queryImgByid,delImg} from '@/api/login'
import { Toast,ImagePreview , Dialog } from 'vant';
import {getUsername} from '@/utils/cookie.js'
export default {
    components:{BackHeader},
    data() {
        return {
            showTitle:"照片管理",
            arrImgList:[],
        }
    },
    methods:{
        imgZoom(item,index){
            let arr = []
            this.arrImgList.forEach((item)=>{
                arr.push(item.imgUrl)
            })
            ImagePreview({
                images:arr,
                startPosition:index
            })
        },
        queryInfo(){
             let data = {
                 username:getUsername()
             }
             queryImgByid(data).then(res=>{
                 this.arrImgList = res.data.data
             })
         },
          delImgList(id){
             Dialog.confirm({
                title: '提示',
                message: '您确认删除当前照片吗？',
                }).then(() => {
                    delImg({id:id}).then(res=>{
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
.wrap{
  margin-bottom: 0.8rem;

.imgList{
    width: 94%;
    margin: 0.1rem auto;
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
    .imgWrap{
       img{
           width: 100%;
       }
    }
    .delbtn{
         margin: 0.05rem;
    }
  }
      
}
</style>


