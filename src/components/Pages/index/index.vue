<template>
<div class="index">
<vue-particles
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      >
      
      </vue-particles>
      <span style="font-size:35px;color:black">自动化测试管理平台</span>
</div>
</template>
<script>
export default{
    name: 'IndexPage'
}
</script>

<style>
	/* .login{
    width: 100%;
    height: 100%;
    
    background: #3E3E3E;
    position: relative;
} */


</style>
