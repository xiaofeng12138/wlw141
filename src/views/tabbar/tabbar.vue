<template>
    <div class="tabbar">
        <van-tabbar v-model="active" route active-color="#07c160" inactive-color="#000">
            <van-tabbar-item name="home" icon="home-o" to="/" >首页</van-tabbar-item>
            <van-tabbar-item name="messageList" icon="comment-o" to="/messageList">留言板</van-tabbar-item>
            <van-tabbar-item name="friends" icon="photo-o" to="/upload" >上传</van-tabbar-item>
            <van-tabbar-item name="setting" icon="user-circle-o" to="/personal" >我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data(){
         return {
            active: 'home',
            };
    },

}
</script>
<style lang="scss" scoped>

</style>


