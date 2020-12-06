<template>
  <div class="app1">
    <div class="index-banner">
      <div class="animated fadeInRight"><img v-lazy="require('../../assets/img/index/app1/app.png')" alt=""></div>
    </div>

    <div class="app_section1">
      <div class="container_self">
        <div class="item_thu">
          <div align="center">
            <img v-lazy="require('../../assets/img/index/app1/act_1.png')" alt="">
            <p>二课活动</p>
            <p>全校二课活动等你来参加，学分交友实践</p>
          </div>

        </div>
        <div class="item_thu">
          <div align="center">
            <img v-lazy="require('../../assets/img/index/app1/act_2.png')" alt="">
            <p>高校头条</p>
            <p>给你最全面的校园资讯、学习、娱乐、成长、生活等特色栏目内容丰富多彩。</p>
          </div>

        </div>
        <div class="item_thu">
          <div align="center">
            <img v-lazy="require('../../assets/img/index/app1/act_3.png')" alt="">
            <p>话题广场</p>
            <p>最热门有趣的话题，互动交流大平台，记录生活，展现自我。</p>
          </div>

        </div>
        <div class="item_thu">
          <div align="center">
            <img v-lazy="require('../../assets/img/index/app1/act_4.png')" alt="">
            <p>福利中心</p>
            <p>陪伴大学生生活，同时给大学生带来很多福利。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="app_section2">
      <div>
        <div class="item font">
          <div class="context">
            <p>PE校园</p>
            <p>学生成长平台</p>
          </div>
        </div>
        <div class="item pic">
          <span >安卓平台下载：</span>
        <img v-lazy="require('../../assets/img/index/app1/app_code.png')" alt="">
        </div>
      </div>

    </div>

  </div>
</template>

<script>

    export default {

        name: 'app1',
        data () {
            return {

            }
        },
        methods: {

        },
        mounted() {

        },
        created(){

        }
    }
</script>

<style scoped>

  /*自适应margin*/
  .app1 .container_self{
    margin: 0 auto;
    width: 95%;
    overflow: hidden;
  }

  @media (min-width: 1200px){
    .app1 .container_self {
      width: 70%!important;
    }
  }

  .app1 .index-banner {
    height: 34.5vw;
    background: url(../../assets/img/index/app1/app_banner.png) center no-repeat;
    background-size: cover;
    text-align: center;
    color: #fff;
    position: relative;
  }
  .app1 .index-banner div {
    width: 23.5vw;
    position: absolute;
    right: 17vw;
    top: 30%;
  }
  .app1 .fadeInRight {
    -webkit-animation-name: fadeInRight;
    animation-name: fadeInRight;
  }
  .app1 .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .app1 .index-banner div img {
    width: 100%;
  }
  .app1 .index-banner img {
    vertical-align: middle;
  }
  .app1 .index-banner img {
    border: 0;
  }

  /*区域1*/
  .app1 .app_section1{
    overflow: hidden;
    padding: 150px 0 0 0;
  }
  .app1 .app_section1 .item_thu{
    width: 100%;
    padding: 20px;
  }

  .app1 .app_section1 .item_thu img{
    width: 30%;
  }

  @media (min-width: 760px){
    .app1 .app_section1 .item_thu{
      width: 40%;
      float: left;
    }
    .app1 .app_section1 .item_thu img{
      width: 60%;
    }
  }

  .app1 .app_section1 .item_thu p:nth-of-type(1) {
    font-size: 24px;
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
  }
  .app1 .app_section1 .item_thu p:nth-of-type(2) {
    font-size: 15px;
    line-height: 24px;
    text-align: center;
    color: #898888;
    width: 80%;
    padding: 10px 0;
    min-height: 70px;
  }

  /*区域2*/
  .app1 .app_section2{
    overflow: hidden;
    background: url(../../assets/img/index/app1/app_banner2.png) no-repeat;
    background-size: 100% 100%;
    height: auto;
    width: 100%;
    min-height: 171px;
  }

  .app1 .app_section2 img{
    width: 30%;
  }
  .app1 .app_section2 .item{
    margin: 30px 0;
    width: 100%
  }
  .app1 .app_section2 .item span{
    vertical-align: top;
    color: white;
    margin-right: 20px;
    margin-left: 20%;
    font-size: 14px;
  }

  .app1 .app_section2 .pic{
    display: inherit;
  }
  .app1 .app_section2 .font{
    display: none;
  }

  @media (min-width: 760px){

    .app1 .app_section2 img{
      width: 30%;
    }
    .app1 .app_section2 .item{
      margin: 30px 0;
      width: 50%;
      height: 100%;
      float: left;;
      display: inline;
    }
    .app1 .app_section2 .item span{
      margin-right: 20px;
      margin-left: 0;
    }

    .app1 .app_section2 .item .context{
      top:40px;
      margin-left: 60px;
    }
    .app1 .app_section2 .pic{
      display: inherit;
    }
    .app1 .app_section2 .font{
      display: inherit;
    }
  }

  .app1 .app_section2 p:nth-of-type(1) {
    font-size: 24px;
    color: white;
    margin-top: 20px;
    font-weight: bold;
  }
  .app1 .app_section2 p:nth-of-type(2) {
    font-size: 15px;
    line-height: 24px;
    color: white;
    width: 80%;
    padding: 10px 0;
  }

</style>
