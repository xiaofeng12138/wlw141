<template>
    <div>
            <BackHeader :configData = 'showTitle' style="showHeader"/>
            <div class="videoList">
                <div class="videoContent">
                    <div class="videoHeader">
                        物联网141班级采访视频
                    </div>
                    <div class="videoWrap">
                        <video src="http://wlw141.xiaofenggege.com/wlwVideo.mp4" 
                          width="100%"
                          controls="controls"
                          poster="@/static/album.png"
                          webkit-playsinline="true"
                          x5-video-orientation="portraint" 
                          x5-video-player-type="h5" 
                          ></video>
                    </div>
                </div>
                <div class="videoContent">
                    <div class="videoHeader">
                        物联网141毕业相册
                    </div>
                    <div class="videoWrap">
                        <video src="http://wlw141.xiaofenggege.com/wlwPhoto.mp4" 
                          width="100%"
                          controls="controls"
                          poster="@/static/videoPhoto.png"
                          webkit-playsinline="true"
                          x5-video-orientation="portraint" 
                          x5-video-player-type="h5" 
                          ></video>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import BackHeader from '@/components/header/backHeader.vue'
export default {
    components:{BackHeader},
    data() {
        return {
            showTitle:"视频列表",
        }
    },
}
</script>

<style lang="scss" scoped>
.videoList{
    width: 94%;
    margin: 0.1rem auto;
    .videoContent{
        border: 1px solid #f1f1f1;
        .videoHeader{
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 0.16rem;
            margin-left: 0.2rem;
            color:rgba(0, 0, 0, 0.6)
        }
        .videoWrap{
           width: 100%;
        }
    }

}
</style>

