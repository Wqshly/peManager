<template>
  <div id="competition_container">
    <v-competition/>
  </div>
</template>

<script>
import vCompetition from "@/components/competition"
export default {
    components:{
        vCompetition,
    },
    data() {
        return {
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
    width: 90%;
    margin: 0 auto;
  }

</style>
