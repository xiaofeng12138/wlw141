<template>
    <div class="wrap">
        <BackHeader :configData="bannerTitle"/>
        <div class="messageBox">
            <div class="title">
                世界那么大，我想留个言~~
                <img src="@/static/love.png" alt="">
            </div>
                <van-field
                    v-model="message"
                    rows="4"
                    autosize
                    type="textarea"
                    placeholder="请输入您的留言"
                    />
             <van-button type="info" block  round style="margin-top:0.2rem" @click="submitMessage">提交留言</van-button>
        </div>
    </div>
</template>
<script>
import BackHeader from '@/components/header/backHeader.vue'
import {AddMessage} from '@/api/login.js'
import {getUsername} from '@/utils/cookie.js'
import Time from '@/utils/time.js'
import { Toast } from 'vant';
export default {
    components:{BackHeader},
    data() {
        return {
            bannerTitle:'添加留言',
            message:''
        }
    },
    methods:{
        submitMessage(){
            let data ={
                author:getUsername(),
                messageContent:this.message,
                time:Time()
            }
            if(data.messageContent.trim().length == 0 ){
                Toast({
                      message: '留言内容不能为空',
                      icon: 'cross',
                    });
                    return false
            }else{
                AddMessage(data).then(res=>{
                    if(res.data.code == '200'){
                         Toast({
                            message: res.data.msg,
                            icon: 'success',
                            });
                        this.message = ''    
                        // this.$router.go('-1')
                    }else{
                        Toast({
                            message: res.data.msg,
                            icon: 'cross',
                            });
                            return false
                        }
                })
            } 
        }
    }
    
}
</script>
<style lang="scss" scoped>
.wrap{
    height: 100vh;
    background-color: #F1F1F1;
    .messageBox{
        width: 90%;
        margin: auto;
    .title{
        height: 0.6rem;
        font-size: 0.16rem;
        line-height: 0.6rem;
        text-align: center;
        background-color: #F1F1F1;
        img{
            display: inline-block;
            height: 0.5rem;
            width: 0.5rem;
        }
    }
}

}


</style>


