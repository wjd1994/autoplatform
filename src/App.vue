<template>
  <div id="app">
    <vue-particles 
        color="#000"
        :particleOpacity="0.7"
        :particlesNumber="40"
        shapeType="polygon"
        :particleSize="2"
        linesColor="#000"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="40"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="false"
        clickMode="bubble"
        hidden
      >
      
      </vue-particles>
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
    /* height: calc(100% - 100px); */
    position: absolute;
    overflow: hidden;
  }
/* #mainview{
  position: relative;
  top:100px;
  width:80%;
  height:80%;
} */
</style>
