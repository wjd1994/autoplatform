<template>
  

<!-- <el-menu  :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select="handleSelect"
 background-color="#545c64" text-color="#303133" active-text-color="#67C23A"
> -->
<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select="handleSelect"
 background-color="#545c64" text-color="white"
>
  <NavMenu :navMenus="asidemenudata"></NavMenu>
</el-menu>

</template>





<script>
import NavMenu from './NavMenu.vue'
  export default {
  components: { NavMenu },
    name: "AsideMenu",
    data() {
      return {
        
      };
    },
    props:['isCollapse','asidemenudata','activeIndex'],
     watch: {
    $route() {
      this.setCurrentRoute();
    },
  },
  created() {
    //动态调整左侧菜单栏高度 document.documentElement.clientHeight
  },
    methods: {
      setCurrentRoute() {
      // this.activeIndex = this.$route.path; // 通过他就可以监听到当前路由状态并激活当前菜单
    },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key){
        this.$router.push(key);
      }
    }
  }
</script>
<style>
  #leftside{
    background-color:#545c64;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width: 200px;
    height:100%;

  }
  .el-menu--collapse{
    width: 60px;
    height:100%;

  }
  .el-menu-vertical-demo{
    height:100%;
  }
</style>