<template>
  

<fragment class="navMenu">

    <template v-for="navMenu in navMenus">
        <!-- 最后一级菜单 -->
      <el-menu-item v-if="!navMenu.children&&navMenu"
                    :key="navMenu.id" :data="navMenu" :index="navMenu.name" 
                   >
        <i :class="navMenu.icon"></i>
        <span slot="title">{{navMenu.alias}}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu v-if="navMenu.children&&navMenu"
                  :key="navMenu.id" :data="navMenu" :index="navMenu.name">
        <template slot="title">
          <i :class="navMenu.icon"></i>
          <span> {{navMenu.alias}}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :navMenus="navMenu.children"></NavMenu>
      </el-submenu>
    </template>

  </fragment>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style>
</style>
