<template>
  <div id="container">
    <div class="home-left-container">
    </div>
    <div class="home-center-container">
      <v-rank class="center_row"/>
      <v-rank class="center_row"/>
      <v-rank class="center_row"/>
    </div>
    <div class="home-right-container">
      <v-score/>
    </div>
  </div>
</template>

<script>
  import vRank from "../../components/rank"
  import vScore from "../../components/myScore"

  export default {
    components: {
      vRank,
      vScore
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {

    },
    created() {

    },
  }
</script>

<style scoped>
  #container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

  }

  .home-left-container {
    border:3px solid #ebebeb;
    width: 300px;
    height: 500px;
  }
  .home-center-container {
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
  }
  .center_row {
    width: 100%;
    margin: 10px 0;
  }
  .home-right-container {
    width: 300px;
    margin-right: 20px;
  }
</style>
