<template>
  <div class="venue">
    <div class="index-banner">
      <div class="index-font-box">
        <h1>线上预约</h1>
        <p>无需登录，更简单快捷地场馆预约</p>
      </div>
    </div>
    <v-venue></v-venue>
  </div>
</template>

<script>
  import vVenue from '../../components/venue/venue.vue'
  export default {
    components:{
      vVenue
    },
  }
</script>

<style scoped>

  .venue .index-banner {
    height: 34.5vw;
    background: url(../../assets/img/index/venue/venue.jpg) center no-repeat;
    background-size: cover;
    color: #fff;
    position: relative;
  }
  .venue .index-banner .index-font-box {
    display: none;
  }

  @media (min-width: 760px) {
    .venue .index-banner .index-font-box {
      position: absolute;
      display: inherit;
      top: 35%;
      left: 10%;
      font-weight: 200;
    }
  }

  .venue .index-banner .index-font-box h1 {
    font-family: inherit;
    font-weight: 500!important;
    line-height: 1.1;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 40px;
  }

  .venue .index-banner .index-font-box p {
    margin-top: 15px;
    font-size: 20px;
  }


</style>
