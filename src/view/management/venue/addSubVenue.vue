<template>
  <div id="venue_new_container">
    <router-menu :headers="headers"></router-menu>
    <sub-venue/>
  </div>
</template>

<script>
  import subVenue from "../../../components/venue/addSubVenue"

  export default {
    components: {
      subVenue
    },
    data() {
      return {
        headers: [
          {
            name: '新增场馆',
            link: '/venue/management/create'
          },
          {
            name: '管理场馆',
            link: '/venue/management/management'
          },
          {
            name: '添加运动馆',
            link: '/venue/management/addSubVenue'
          },
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
  #venue_new_container {
    width: 100%;
    margin: 0 auto;
  }

</style>
