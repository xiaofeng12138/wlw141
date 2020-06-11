<template>
    <div class="header">
         {{title}}
    </div>
</template>
<script>
export default {
   props:{
    configData:{
        type:String,
        default:""
    }
  },
    data(){
        return{
            title:''
        }
    },

     watch:{
      configData:{
          handler(newVlaue,oldValue){
           this.title = newVlaue
            //   this.title = newVlaue
          },
          immediate:true
      },
    
    },
    mounted() {
        // console.log(this.props)
    },
}
</script>

<style lang="scss" scoped>
.header{
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
    font-size: 0.18rem;
    height: 0.6rem;
    background: linear-gradient(to right, #2467f3, #4697fd, #25B0F3);
    text-align: center;
    line-height: 0.6rem;
    color: #fff;
}
</style>

