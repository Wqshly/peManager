<template>
  <div>
    <div class="home_page">
      <v-header></v-header>
      <div class="home_main">
        <router-view></router-view>
      </div>
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        methods:{

        },
        created() {

        },
    }
</script>

<style scoped>
  .home_page{

  }
  .home_main{
    margin: 0 auto;
    max-width: 1140px;
    width: 100%;
    padding-top: 5px;
    min-height: 500px;
  }

</style>
