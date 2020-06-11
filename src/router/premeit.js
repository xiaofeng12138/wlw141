import router from "./index";
import {getToken,setToken} from '@/utils/cookie'
import { Toast } from "vant";

const whiteRouter = ['/login']

router.beforeEach((to,form,next)=>{
    if(getToken()){
       if(to.path == '/login'){
         setToken('')
            // store.commit("login/SET_TOKEN","");
            // store.commit("login/SET_USERNAME","");
          next()
        }else{
          next()
        }
    }else{
       if(whiteRouter.indexOf(to.path) != -1){  
            next() 
        }else{
            next('/login')  
            Toast.fail("请先登录~~");
        }
    }
})