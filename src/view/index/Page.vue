<template>
    <div>
      <v-sidebar></v-sidebar>
      <div>
        <router-view></router-view>
      </div>
      <v-footer></v-footer>
    </div>
</template>

<script>
import vSidebar from './indexHeader'
export default {
  data () {
    return {}
  },
  components: {
      vSidebar
  }
}
</script>

<style scoped>

</style>
