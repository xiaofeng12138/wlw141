import Vue from "vue";
import Vuex from "vuex";
import sliderStatus from './modules/sliderStatus'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sliderStatus
  }
});

