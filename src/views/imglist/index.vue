<template>
    <div class="wrap">
        <BackHeader :configData = 'showTitle' style="showHeader"/>
        <div class="imgList" v-for="(item,index) in arrImgList" :key="index">
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
           <div class="imgWrap">
             <img v-lazy="item.imgUrl" alt="" @click="imgZoom(item,index)">
           </div>
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
import BackHeader from '@/components/header/backHeader.vue'
import {queryImgType} from '@/api/login'
import { Toast,ImagePreview  } from 'vant';
export default {
    components:{BackHeader},
    data() {
        return {
            showTitle:this.$route.params.title,
            arrImgList:[],
            currentPage:1,
            total:0,
            imgType:''
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
        changePage(page){
          this.queryImgList(this.imgType,page)
        },
        queryImgList(imgType,page){
           let data = {
               imgType:imgType,
               page:page
           }
         queryImgType(data).then(res=>{
                if(res.data.code == '200'){
                    this.total = res.data.count
                    this.arrImgList = res.data.data
                }else{
                    Toast({
                        message: res.data.msg,
                         icon: 'cross',
                    });
                     this.arrImgList =[],
                     this.total = 0
                     return false
                     }
                 })
        }

    },
    mounted(){
        let imgType  = '';
        let showTitle = this.$route.params.title
         switch (showTitle) {
                    case "毕业照":
                        imgType="BYZ";
                        break;
                    case "班级活动":
                        imgType="BJHD";
                        break;
                    case "美丽校园":
                        imgType="MLXY";
                        break;
                    case "生活随笔":
                        imgType="SHSB";
                        break;
                    case "其他":
                        imgType="QT";
                        break;
                    }
            this.imgType = imgType
            this.queryImgList(imgType,1)
                
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


