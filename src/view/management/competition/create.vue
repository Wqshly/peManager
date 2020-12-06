<template>
  <div id="competition_container">
    <router-menu :headers="headers" :center="true"></router-menu>
    <competition-create/>
  </div>
</template>

<script>
  import competitionCreate from "../../../components/competition/create"

  export default {
    components: {
      competitionCreate,
    },
    data() {
      return {
        headers: [
          {
            name: '本地比赛',
            link: '/competition/management/home'
          },
          {
            name: '发起比赛',
            link: '/competition/management/create'
          },
          {
            name: '管理比赛',
            link: '/competition/management/management'
          }
        ]
      }
    },
    mounted() {

    },
    created() {

    },
  }
</script>

<style scoped>
  #competition_container {
    width: 100%;
    margin: 0 auto;
  }

</style>
