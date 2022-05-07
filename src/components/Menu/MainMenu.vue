<template>
        <div v-if="dataflag" class="main-layout">

            <div class="menuheader">
                <header-menu :isCollapse.sync="isCollapse" :menudata="menuData" :activeIndex="activeIndex"/>
            </div>
            <div class="center">
                <div class="menuleft" ref="menuleft">
                  <template v-for="(data,i) in menuData">
                    <div :key="i" v-if="i==menuindex1">
                    <aside-menu v-if="data['childs']" :isCollapse="isCollapse" :asidemenudata="data['childs']" :activeIndex="activeIndex" />
                    <aside-menu v-else :isCollapse="isCollapse" :asidemenudata="[data]" :activeIndex="activeIndex" />

                    </div>
                  </template>
                </div>
                <div class="content">
                  <el-tabs v-model="state.activeIndexTab" type="card" @tab-click="clickTab" @tab-remove="removeTab" closable>
                    <el-tab-pane v-for="item in state.openTab" :key="item.title" :label="item.title" :name="item.name">
                        <router-view/>
                    </el-tab-pane>
                  </el-tabs>
                  

                </div>
            </div>
        </div>

</template>
<script>
import HeaderMenu from './HeaderMenu.vue'
import AsideMenu from './AsideMenu.vue'
export default {
  name: 'MainMenu',
  data(){
    return {
      //控制菜单数据请求完成后才渲染
      dataflag: true,
      //左侧菜单隐藏变量
      isCollapse: false,
      //主菜单id切换变量
      menuindex1: 0,
      //tab标签页
      state: {
        openTab: [],
        activeIndexTab: ''
      },
      //默认激活菜单选项
      activeIndex: "/index",
      //菜单数据
      menuData:[
          {
              entity: {
              id: 0,
              name: "/index",
              icon: "el-icon-message",
              alias: "首页"
            },
          },
          {
            entity: {
            id: 1,
            name: "/tool",
            icon: "el-icon-message",
            alias: "工具栏"
            },
          //二级
          childs: [
          {
              entity: {
              id: 2,
              name: "/tool/tool",
              icon: "el-icon-message",
              alias: "一级菜单"
            }
          },
          {
            entity: {
            id: 21,
            name: "/tool2",
            icon: "el-icon-message",
            alias: "二级菜单"
          },
          //二级
          childs: [
            {
              entity: {
                id: 22,
                name: "/tool/tool1",
                icon: "el-icon-bell",
                alias: "权限管理"
              }
            },
            {
              entity: {
                id: 23,
                name: "/tool/tool2",
                icon: "el-icon-bell",
                alias: "角色管理"
              }
            },
          ]
          }
        ]
          }
        ],
       
    }
  },
  props:[],
  beforeCreate(){
    
  },
  created(){
    
    this.getmenudata();
    var path = this.$router.history.current.fullPath
    this.$router.push('/')
    this.$router.push(path)
    

  },
  mounted(){

    this.$refs.menuleft.style.minHeight=window.innerHeight+"px";
  },
  updated(){

  },
  

  watch:{
    $route(to){
      this.menuindex1 = to.meta.index //切换菜单id
      this.activeIndex = to.path //同步切换激活菜单
      let flag = false
      this.state.openTab.forEach(tab => {
       if (to.path == tab.name) {
         this.state.activeIndexTab = to.path
         flag = true
         return
       }
     })
     if (!flag) {
       this.state.openTab.push({name: to.path , title: to.meta.title})
       this.state.activeIndexTab = to.path
     }       
    }
  },
  components: {
    HeaderMenu,
    AsideMenu,
  },
  methods:{
    getmenudata(){
      var _this = this
      this.$axios.get("http://127.0.0.1:8082/getmenudata",
        {}
      ).then(function(res){
        _this.menuData = res.data
        console.log(res)
        _this.dataflag = true
      }).catch((err)=>{
        console.log(err)
      })
    },

    clickTab () {
      this.$router.push({path: this.state.activeIndexTab})
    },
    removeTab (targetName) {
      let tabs = this.state.openTab;
      let activeName = this.state.activeIndexTab;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
        
      this.state.activeIndexTab = activeName;
      this.state.openTab = tabs.filter(tab => tab.name !== targetName);
      this.$router.push({path: this.state.activeIndexTab})
    },

  }
}
</script>
<style scoped>
.main-layout{
  display: flex;
  flex-direction: column;
}
.center{
  display: flex;

}
.menuheader{
  /* border:1px solid #000; */
  margin:0px;
  padding:0px;
  
}

.menuleft{
  /* background-color: cornflowerblue; */
  /* min-height: 550px; */
  background-color: #545c64;


}
</style>
