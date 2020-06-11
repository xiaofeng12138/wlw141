<template>
    <div>
        <div class="uploadBox" style="margin-top:0.1rem">
            <van-cell-group>
                <van-cell title="上传说明" icon="coupon-o" />
            </van-cell-group>
            <div class="explain">
               如果您的手机上有一些有意义的照片，您可以分享出来， <span>您上传的照片会显示在首页对应的相册里面，所有人都能看得到哦，请知晓！！！</span>
            </div>
            <van-field
                readonly
                clickable
                name="picker"
                :value="value"
                label="相册"
                placeholder="请选择上传的相册"
                @click="showPicker = true"
                />
             <van-cell-group>
                   <van-cell title="图片上传" icon="photo-o" value="一次性最多上传一张图片"style="margin-top:0.2rem" />
            </van-cell-group>
            <div class="imgUpload">
                <!-- <van-uploader v-model="fileList" multiple :max-count="4" :after-read='beforeUpload' :before-read ="beforeRead"/> -->
                   <el-upload
                        class="avatar-uploader"
                        action="http://up.qiniup.com"
                        :data="uploadData"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                   </el-upload>
                 <van-button type="info" block  round style="margin-top:0.1rem;margin-bottom:1rem" @click="uploadFile" >上 传</van-button>
            </div>
       </div>
        <!-- 选择器 -->
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
    </div>
    
</template>

<script>
import Header from '@/components/header/header.vue'
import { getToken,Upload} from '@/api/login.js'
import Axios from 'axios'
import Time from '@/utils/time.js'
import nowGetTime from '@/utils/getTime.js'
import { Toast,Tab, Tabs  } from 'vant';
import {getUsername} from '@/utils/cookie.js';
export default {
    components:{Header},
    data() {
        return {
            bannerTitle:"图片上传",
            value: '',
            columns: ['毕业照', '班级活动', '美丽校园', '生活随笔', '其他'],
            showPicker: false,
            show:false,
            uploadData:{
                token:'',
                key:''
                },
            imageUrl:'',
        }
    },
     methods: {

        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
        },
        //文件上传
        handleAvatarSuccess(res,file){
             let imgUrl = `http://wlw141.xiaofenggege.com/${res.key}`;
             this.imageUrl = imgUrl
        },
        beforeAvatarUpload(file){
            let houzhui =  ( file.name).split('.')[1]
            if(houzhui == 'mp4'){
                Toast({
                      message: '请上传正确格式图片',
                      icon: 'cross',
                    });
                    return false
            }else{
                let fileName =  (Math.floor(Math.random()*(100000000 - 1) + 100000000) +'.'+ houzhui); 
                this.uploadData.key = fileName;
            }
            
        },
        uploadImg () {
                if(this.value == ''){
                     Toast({
                      message: '选择上传相册',
                      icon: 'cross',
                    });
                   return false
                }else if(this.imageUrl.length == 0){
                     Toast({
                      message: '选择上传图片',
                      icon: 'cross',
                    });
                   return false
                }
                else{
                    this.show = true
                    let imgType = '';
                    switch (this.value){
                    case "毕业照":
                        imgType="BYZ";
                        break;
                    case "班级活动":
                        imgType="BJHD";
                        break;
                    case "美丽校园":
                        imgType="MLXY";
                        break;
                    case "生活随笔":
                        imgType="SHSB";
                        break;
                    case "其他":
                        imgType="QT";
                        break;
                    }
                     let data = {
                            author:getUsername(),
                            imgType,
                            imgTime:Time(),
                            imgUrl:this.imageUrl,
                        }
                        Upload(data).then(res=>{
                            if(res.data.code == '200'){
                                Toast({
                                    message:res.data.msg,
                                    icon: 'success',
                                });
                                this.value = ''
                                this.imageUrl = ''
                            }else{
                                Toast({
                                    message: res.data.msg,
                                    icon: 'cross',
                                    });
                                return false
                            }
                        })
                }
                    
            },
        //获取七牛云token的函数
        getQiNiuTkoen(){
            getToken().then(res=>{
                this.uploadData.token = res.data.token
            })
        },
        uploadFile(){
            this.uploadImg()
        }
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
       padding-top: 0.1rem;
       margin-bottom: 1rem;
       .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 0.28rem;
            color: #8c939d;
            width: 1rem;
            height:1rem;
            line-height: 1rem;
            text-align: center;
        }
        .avatar {
            width: 1rem;
            height: 1rem;
            display: block;
        }
    }
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .block {
        width: 1.2rem;
        height: 1.2rem;
        background-color: #fff;
    }

</style>


