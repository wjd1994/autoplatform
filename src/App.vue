<template>
  <div id="app">

      <router-view id="mainview"></router-view>

    

  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  created(){
    //请求拦截器
    this.$axios.interceptors.request.use(function(config){
      console.log("begin request")
      return config
    },function(error){
      return Promise.reject(error)
    });
    //响应拦截器
    
  }
}
</script>

<style>
#app{
  margin:0px;
  padding:1px;
  height:100%;
}
#particles-js {
    width: 100%;
    height: calc(100% - 100px);
    position: fixed;
    overflow: hidden;
  }

</style>
