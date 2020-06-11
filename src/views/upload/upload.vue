<template>
    <div class="upload">
        <Header :configData="bannerTitle" />
        <van-tabs v-model="active" color='#2B70F5'>
            <van-tab title="图片上传">
                <ImgUpload />
            </van-tab>
            <van-tab title="视频上传">
                <VideoUpload />
            </van-tab>
        </van-tabs>
    </div>
    
</template>

<script>
import Header from '@/components/header/header.vue'
import ImgUpload from './imgUpload'
import VideoUpload from './videoUpload'
import { Toast,Tab, Tabs  } from 'vant';
export default {
    components:{Header,ImgUpload,VideoUpload},
    data() {
        return {
            bannerTitle:"文件上传",
            active:0
        }
    },
    
}
</script>
<style lang="scss" scoped>
.upload{
    width: 100%;
    background-color: #f1f1f1;
}
</style>


