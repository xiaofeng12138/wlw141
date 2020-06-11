import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import axios from 'axios'
import './router/premeit'
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//使用图片预览功能
import VuePreview from'vue-preview'
Vue.use(VuePreview) 

import { Lazyload } from "vant"

Vue.use(Lazyload)

Vue.use(Vant);

axios.defaults.withCredentials=true

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

window.addEventListener('popstate', function (e) {
  router.isBack = true
},false)
