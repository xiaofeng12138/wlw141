<template>
    <div>
        <div class="uploadBox" style="margin-top:0.1rem">
            <van-cell-group>
                <van-cell title="上传说明" icon="coupon-o" />
            </van-cell-group>
            <div class="explain">
               如果您的手机上有一些好玩的视频，您可以分享出来， <span>您上传的视频会显示在首页视频文件夹里面，所有人都能看得到哦，请知晓！！！</span>
            </div>
             <van-cell-group>
                   <van-cell title="视频上传" icon="video-o" value="一次性最多上传一条视频"style="margin-top:0.2rem" />
            </van-cell-group>
            <div class="imgUpload">
                <!-- <van-uploader v-model="fileList" multiple :max-count="4" :after-read='beforeUpload' :before-read ="beforeRead"/> -->
                   <!-- <el-upload
                        class="avatar-uploader"
                        action="http://up.qiniup.com"
                        :data="uploadData"
                        :auto-upload = false
                        :show-file-list="false"
                        :on-change="handleChange"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                         :file-list="fileList"
                        >
                          <el-button size="small" type="primary">点击上传</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                       
                   </el-upload> -->
                   <el-upload
                        ref="upload"
                        :limit="1"
                        action="http://up.qiniup.com"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload"
                        :file-list="fileList"
                        :data="uploadData"
                        :on-success="handleAvatarSuccess"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary" v-if="fileList.length >1" disabled>选取文件</el-button>
                        <el-button slot="trigger" size="small" type="primary" v-else>选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传mp4文件，且大小不超过50M 备注：苹果手机主动拍的视频是mov格式，目前video标签不支持播放改格式视频，使用苹果手机的同学，可以先通过微信拍摄，然后保存手机再上传</div>
                    </el-upload>

                 <van-button type="info" block  round style="margin-top:0.2rem" @click="submitUpload">上 传</van-button>
            </div>
       </div>
    </div>
    
</template>

<script>
import { getToken,uploadVideo} from '@/api/login.js'
import Axios from 'axios'
import Time from '@/utils/time.js'
import nowGetTime from '@/utils/getTime.js'
import { Toast } from 'vant';
import {getUsername} from '@/utils/cookie.js';
export default {
    data() {
        return {
            uploadData:{
                    token:'',
                    key:''
                },
            fileList: [],
        }
    },
     methods: {
         submitUpload() {
           this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(fileList)
        },
        //文件上传
        handleAvatarSuccess(res,file){
            if(res.key){
                this.fileList = []
                let videoUrl = `http://wlw141.xiaofenggege.com/${res.key}`;
                let data = {
                    author:getUsername(),
                    videoTime:Time(),
                    videoUrl:videoUrl
                }
                uploadVideo(data).then(res=>{
                    if(res.data.code == '200'){
                        Toast({
                            message: res.data.msg,
                            icon: 'success',
                            });
                    }else{
                        Toast({
                            message: res.data.msg,
                            icon: 'cross',
                            });
                     }
                })
            }else{
                Toast({
                       message: '上传错误',
                       icon: 'cross',
                    });
                    return false;
            }
        },

        beforeAvatarUpload(file){
            if(file.size / 1024 / 1024 > 50){
              Toast({
                       message: '请上传文件大小小于50M',
                       icon: 'cross',
                    });
                    return false;
            }else{
               let fileName =  (Math.floor(Math.random()*(100000000 - 1) + 100000000) +'.mp4'); 
               this.uploadData.key = fileName;
            }
        },
        //获取七牛云token的函数
        getQiNiuTkoen(){
            getToken().then(res=>{
                this.uploadData.token = res.data.token
            })
        },
    },

    mounted(){
        this.getQiNiuTkoen()
    }
    
}
</script>
<style lang="scss" scoped>

    .explain{
        padding: 0.1rem 0;
        height: 1rem;
        width: 90%;
        margin: auto;
        font-size: 0.16rem;
        span{
            color: hotpink;
            font-weight: bold;
        }
    }
    .imgUpload{
       width: 90%;
       margin: auto;
       margin-bottom: 1.5rem;
    }
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .block {
        width: 120px;
        height: 120px;
        background-color: #fff;
    }

</style>


