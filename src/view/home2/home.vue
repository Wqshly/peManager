<template>
  <div class="main-nav">
    <v-rank></v-rank>
    <br>
  </div>
</template>

<script>
    import vRank from "../../components/exerciseCalendar"
export default {
    components:{
        vRank,
    },
    data() {
        return {

        }
    },
    methods: {


    },
    mounted() {

    },
    created() {

    },
}
</script>

<style scoped>

  .main-nav {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
</style>
