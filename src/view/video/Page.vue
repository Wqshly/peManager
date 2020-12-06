<template>
  <div>
    <div style="height: 100%;width: 100%" class="video_page">
      <v-header></v-header>
      <div style="background-color: #f2f5f6;">
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

}
</script>

<style scoped>

</style>
