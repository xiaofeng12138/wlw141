
//侧边栏导航状态的参数
const state = {
    showLeft:false
 }
 
 const mutations = {
    SET_OPEN(state){
        state.showLeft = true
    },
    SET_CLOSE(state){
        state.showLeft = false
    },
 }
 
 export default {
   namespaced:true, 
   state,
   mutations
 };