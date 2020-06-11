<template >
    <div class="indexView">
        <div class="navBar">
            <van-row>
                <van-col span="3">
                <img src="@/static/common_icon_nav@2x.png" alt @click="showImgList = true" />
                </van-col>
                <van-col span="18" class="title">物联网141照片集</van-col>
                <van-col span="3">
                </van-col>
            </van-row>
        </div>
        <div class="conetnt">
          <li v-for="(item,index) in list" :key="index"> {{item}} </li>
          <van-button type="primary" block style="margin-top:0.5rem" @click="showImgList = true">开启回忆之旅</van-button>
        </div>


        <!-- 左侧弹出层 -->
        <van-popup v-model="showImgList" position="left" :style="{width: '60%',height:'100%'}" style="background-color:#f1f1f1" :close-on-click-overlay=false >
          <div class="modelHeader">
                <span class="user">
                <img src="@/static/tg_icon_depart@3x.png" alt />
                  {{LoginUser}}
                </span>
                <span class="close" @click="showImgList = false">
                <img src="@/static/common_icon_close@2x.png" alt />
                </span>
          </div>
          <div class="imgList">
              <van-cell v-for="(item,index) in albumName" :title="item" :key="index" is-link  @click="goImgList(item)"/>
               <van-cell title="视频列表"  is-link  @click="goVideoList"/>
          </div>
        </van-popup>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {getUsername,getRegisterTime,setToken,setUsername} from '@/utils/cookie.js'
export default {
   
    data(){
        return{
          showImgList:false,
          LoginUser:getUsername(),
          albumName:['毕业照','班级活动','美丽校园','生活随笔','其他'],
          list: ['写在前面','曾以为毕业是一个结束','其实他也是一个开始','愿以梦为马，不负韶华','莫愁前路无知己','天下谁人不识君'],
        }
    },
    methods:{
     
      goImgList(item){
        this.$router.push({
          name:'imgList',
          params:{
             title:item
          }
        })
      },
      goVideoList(){
        this.$router.push('/allvideolist')
      }
    },

  
}
</script>

<style lang="scss" scoped>
.indexView{
  height: 100vh;
  background-image:url(https://image.weilanwl.com/color2.0/index.jpg);
  background-size: cover;
.navBar {
    width: 100%;
    height: 0.6rem;
    background: linear-gradient(to right, #2467f3, #4697fd, #25B0F3);
  }
  .conetnt{
    width: 94%;
    margin: auto;
    li{
      width: 100%;
      height: 0.5rem;
      font-size: 0.16rem;
      line-height: 0.5rem;
      margin: 0.1rem auto;
      text-align: center;
      color:#fff;
      background-color: rgba(92, 168, 190, 0.5);
    }

  }
  .van-row {
    height: 0.6rem;
    .title {
      margin-top: 0rem !important;
      color: #fff;
      font-size: 0.18rem;
      text-align: center;
    }
    .van-col {
      line-height: 0.6rem;
      margin-top: 0.15rem;
      img {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        margin: auto;
      }
    }
  }
  .modelHeader {
        margin-top: 0.4rem;
        height: 0.5rem;
        width: 100%;
        display: flex;
        .user {
          display: block;
          width: 80%;
          font-size: 0.16rem;
          line-height: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        img {
            width: 0.3rem;
            height: 0.3rem;
            margin-top: 0.1rem;
            margin-left: 0.05rem;
        }
        }
        .close {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        background-color: #ccc;
        line-height: 0.5rem;
        margin-top: 0.1rem;
        img {
            width: 0.3rem;
            height: 0.3rem;
            margin: auto;
        }
     }
  }
  .imgList{
    margin-top: 0.5rem;
  }
}
</style>
