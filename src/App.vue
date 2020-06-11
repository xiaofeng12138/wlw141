<template>
  <div id="app">
     <transition :name="transitionName">
           <router-view class="Router"></router-view>
            <!-- <router-view class="Router" ></router-view> -->
      </transition>
    <Tabbar />
  </div>
</template>
<script>
import Tabbar from '@/views/tabbar/tabbar.vue'
export default {
  components:{
    Tabbar
  },
  data(){
    return{
       transitionName: 'slide-right', //初始过渡动画方向
    }
  },
   watch: {
      $route(to, from) {
        // 切换动画
        let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
        this.$router.isBack = false
      }
    },
}
</script>


<style lang='scss'>

html {
  font-family: "Helvetica Neue", Tahoma, Arial, PingFangSC-Regular,
    "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  -webkit-user-select: none;
  user-select: none;
  font-size: 26.6666vw;
  
// .Router {
//       position: absolute;
//       height: 100%;
//       width: 100%;
//       transition: all .377s ease;
//       will-change: transform;
//       top: 0;
//       backface-visibility: hidden;
//       perspective: 1000;
//     }
//     .slide-left-enter,
//     .slide-right-leave-active {
//       opacity: 0;
//       transform: translate3d(-100%, 0, 0);
//     }

//     .slide-left-leave-active,
//     .slide-right-enter {
//       opacity: 0;
//       transform: translate3d(100%, 0 ,0);
//     }
}
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-message-box {
  width: 300px;
}
a {
  text-decoration: none;
  display: block;
}
img {
  vertical-align: top;
}
li {
  list-style: none;
}
.router-link-exact-active {
  i {
    color: #3883f9;
    font-weight: bold;
  }
  span {
    color: #3883f9;
    font-weight: bold;
  }

}
</style>
