<template>
  <div id="app">
    <!-- <main-menu/> -->

    <router-view></router-view>

  </div>
</template>

<script>
// import MainMenu from './components/Menu/MainMenu.vue'

export default {
  name: 'App',
  components: {
    // MainMenu
  }
}
</script>

<style>
#app{
  margin:0px;
  padding:1px;
  height:100%;
}
</style>
