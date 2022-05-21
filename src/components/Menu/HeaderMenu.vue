<template>
  <div class="headermenu">
    <transition name="el-fade-in-linear">
        <img ref="menuimg" id="menuimg" v-if="menuimgshow" src="../../assets/transsionlogo.jpeg" />
    </transition>
    <el-button type="text" @click="menushow" v-bind:icon="foldicon" id="menushowbutton" style="font-size: 20px;color:black"></el-button>
      <el-menu ref="menu" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :unique-opened=true
        text-color="#303133" active-text-color="#67C23A"
      >
          <NavMenu :navMenus="menudata"></NavMenu>
      </el-menu>
  </div>
</template>
<script>
import NavMenu from './NavMenu.vue'
  export default {
    name: 'HeaderMenu',
    components: { NavMenu },
    data() {
      return {
        foldicon:"el-icon-s-fold",
        menuimgshow:true
      };
    },
    props:['isCollapse','menudata','menuindex','activeIndex'],
    mounted(){

    },
    methods: {
      //左侧菜单栏隐藏显示方法
      menushow(){
        if(this.isCollapse){
          this.$emit('update:isCollapse',false);
          this.foldicon = "el-icon-s-fold";
          
        }
        else{
          
          this.$emit('update:isCollapse',true);
          this.foldicon = "el-icon-s-unfold";
          
        }
        if(this.menuimgshow){
          this.menuimgshow = false
        }
        else{
          this.menuimgshow = true
        }
      },
      handleSelect(key){
        this.$router.push(key);

      }
    }
  }
</script>
<style scoped>
.headermenu{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.el-menu-demo{
  width:100%;
}
#menuimg{
  height:50px;
  width:165px;
}
#menushowbutton{
  border:none;
  border-radius: 0;
  height:60px;
  width:62px;
}
</style>

