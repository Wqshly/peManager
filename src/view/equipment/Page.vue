<template>
  <div>
    <v-header></v-header>
    <div class="home_main">
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
    }
</script>

<style scoped>
  .home_main{
    margin: 0 auto;
    max-width: 1140px;
    width: 100%;
    padding-top: 5px;
    height: 1000px;
  }

</style>
