<template>
  <div>
    <v-header></v-header>
    <div class="home_main">
      <router-menu :headers="headers"></router-menu>
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        headers: [
          {
            name: '早操',
            link: '/exercises/signIn'
          },
        ]
      }
    },
    methods: {},
    mounted() {

    },
    created() {

    },
  }
</script>
<style scoped>
  .home_main {
    margin: 0 auto;
    width: fit-content;
    min-width: 80%;
    padding-top: 5px;
    overflow: hidden;
  }

</style>
