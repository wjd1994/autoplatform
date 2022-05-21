<template>
        <div v-if="dataflag" class="main-layout">

            <div class="menuheader">
                <header-menu :isCollapse.sync="isCollapse" :menudata="menuData" :activeIndex="activeIndex"/>
            </div>
            <div class="center">
                <div class="menuleft" ref="menuleft" :style="{maxWidth:menuleftwidth}">
                  <template v-for="(data,i) in menuData">
                    <div :key="i" v-if="i==menuindex1">
                    <aside-menu v-if="data['childs']" :isCollapse="isCollapse" :asidemenudata="data['childs']" :activeIndex="activeIndex" />
                    <aside-menu v-else :isCollapse="isCollapse" :asidemenudata="[data]" :activeIndex="activeIndex" />

                    </div>
                  </template>
                </div>

                <div class="content" :style="{width:contentwidth}">
                  <el-tabs v-model="state.activeIndexTab" type="card" @tab-click="clickTab" @tab-remove="removeTab" closable>
                    <el-tab-pane v-for="item in state.openTab" :key="item.title" :label="item.title" :name="item.name">
                        <router-view class="contentview"/>
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
      menuleftwidth: "200px",
      contentwidth: "0px",
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

              id: 0,
              name: "/index",
              icon: "el-icon-message",
              alias: "首页",

          },
          {
            
            id: 1,
            name: "/",
            icon: "el-icon-message",
            alias: "工具栏",
         
          //二级
          children: [
          {

              id: 2,
              name: "/tool/tool",
              icon: "el-icon-message",
              alias: "mock数据"

          },
          {

            id: 21,
            name: "/tool2",
            icon: "el-icon-message",
            alias: "常用工具",

          //二级
          children: [
            {

                id: 22,
                name: "/tool/tool1",
                icon: "el-icon-bell",
                alias: "xmind转excel"

            },
            {

                id: 23,
                name: "/tool/tool2",
                icon: "el-icon-bell",
                alias: "json格式化"

            },
          ]
          }
        ]
        },
        {

            id:3,
            name: "/autotestmanage",
            icon: "el-icon-bell",
            alias: "自动化管理",

          children: [
            {

                id:31,
                name: "/autotestmanage/casemanage",
                icon: "el-icon-bell",
                alias: "用例管理"

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
    
    // this.getmenudata();
    var path = this.$router.history.current.fullPath
    this.$router.push('/')
    this.$router.push(path)
    

  },
  mounted(){
    this.contentwidth = window.innerWidth -230 +"px";
    this.$refs.menuleft.style.minHeight=window.innerHeight-63+"px";
  },
  updated(){
    this.$refs.menuleft.style.minHeight=window.innerHeight-63+"px";
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
    },
    isCollapse(){
      if(this.isCollapse){
        this.menuleftwidth = "60px"
        this.contentwidth = window.innerWidth - 90 + "px"

      }
      else{
        this.menuleftwidth = "200px"
        this.contentwidth = window.innerWidth - 230 + "px"
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
      this.$axios.get("http://10.206.64.161:8000/menu/",
        {}
      ).then(function(res){
        _this.menuData = res.data.data
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
  /* max-width:200px; */

}
.content{
  margin-left:0px;
  /* width: 100%; */
}
.contentview{
  margin-left:5px;
}

</style>
