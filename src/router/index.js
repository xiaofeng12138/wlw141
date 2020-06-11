import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "index", component:resolve=>require(['@/views/index/index.vue'],resolve),},
  { path: "/login", name: "login", component:resolve=>require(['@/views/login/login.vue'],resolve),},
  { path: "/messageList", name: "messageList", component:resolve=>require(['@/views/message/messageList.vue'],resolve),},
  { path: "/addMessage", name: "addMessage", component:resolve=>require(['@/views/message/addMessage.vue'],resolve),},
  { path: "/upload", name: "upload", component:resolve=>require(['@/views/upload/upload.vue'],resolve),},
  { path: "/imgList", name: "imgList", component:resolve=>require(['@/views/imglist/index.vue'],resolve),},
  { path: "/personal", name: "personal", component:resolve=>require(['@/views/personal/index.vue'],resolve),},
  { path: "/queryMessageList", name: "queryMessageList", component:resolve=>require(['@/views/message/queryMessageList.vue'],resolve),},
  { path: "/queryImgList", name: "queryImgList", component:resolve=>require(['@/views/imglist/queryImgList.vue'],resolve),},
  { path: "/videoList", name: "videoList", component:resolve=>require(['@/views/video/index.vue'],resolve),},
  { path: "/userList", name: "userList", component:resolve=>require(['@/views/user/index.vue'],resolve),},
  { path: "/allvideolist", name: "allvideolist", component:resolve=>require(['@/views/video/videolist.vue'],resolve),},
  { path: "/videomanger", name: "videomanger", component:resolve=>require(['@/views/video/videomanger.vue'],resolve),},
];

const router = new VueRouter({
  routes
});

export default router;
