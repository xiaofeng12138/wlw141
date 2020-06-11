<template >
        <div class="navBar">
            <van-row>
                <van-col span="3">
                <img src="@/static/common_icon_back@2x.png" alt @click="goback" />
                </van-col>
                <van-col span="18" class="title">{{ showTitle }}</van-col>
                <van-col span="3">
                </van-col>
            </van-row>
    </div>
</template>
<script>
export default {
    props: {
      configData:{
           type:String,
           default:''
      }
    },
    data(){
        return{
             showTitle:'',
             showIcon:false
        }
    },
    methods:{
        goback(){
             this.$router.go(-1);
        },
    },

    watch:{
       configData:{
         handler(newValve,oldValue){
           this.showTitle = newValve
         },
         immediate:true
       }
    }

  
}
</script>

<style lang="scss" scoped>
.navBar {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
    height: 0.6rem;
    background: linear-gradient(to right, #2467f3, #4697fd, #25B0F3);
  }
  .van-row {
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
</style>
