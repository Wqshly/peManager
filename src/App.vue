<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>

  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
      return {
          reload:this.reload
      }
  },
  data(){
      return {
          isRouterAlive:true
      }
  },
  methods:{
      /*在子组件中注入用于无缝刷新页面*/
      reload (){
          this.isRouterAlive = false;
          this.$nextTick(function(){
              this.isRouterAlive = true
          });
      }
  },
}
</script>

<style lang="less">
  @import "style/common";
  @import "assets/icon/iconfont.css";

</style>
