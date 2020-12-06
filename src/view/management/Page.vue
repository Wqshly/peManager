<template>
  <div>
    <div class="home_page">
      <manager-header/>
      <div class="home_main">
        <router-view></router-view>
      </div>
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
  import managerHeader from './managerHeader'

  export default {
    components: {
      managerHeader
    },
    data() {
      return {
      }
    },
    methods: {},
    mounted() {
      /*if (this.$store.state.user.identity !== '学校管理员') {
        this.$router.push('/login');
      }*/
    },
    created() {

    },
  }
</script>

<style scoped>
  .home_page {
    background-color: #f9f9f9;
  }

  .home_main {
    width: 100%;
    padding-top: 5px;
    min-height: 500px;
  }

</style>
