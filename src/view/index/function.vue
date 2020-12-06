<template>
  <div class="function1">
    <div class="index-banner">
      <div class="animated fadeInRight"><img v-lazy="require('../../assets/img/index/function1/function_1.png')" alt=""></div>
    </div>

    <div class="func_section1">
      <div class="container_self">
        <div class="item_thu">
          <div align="center">
            <img v-lazy="require('../../assets/img/index/function1/act_1.png')" alt="">
            <p>创建活动</p>
            <p>由管理人员在APP、WEB端创建活动，由老师审核后执行活动内容</p>
          </div>

        </div>
        <div class="item_thu">
          <div align="center">
            <img v-lazy="require('../../assets/img/index/function1/act_2.png')" alt="">
            <p>参加活动</p>
            <p>学生可以在APP、H5、WEB端报名参加活动，多端互动，想你所想</p>
          </div>

        </div>
        <div class="item_thu">
          <div align="center">
            <img v-lazy="require('../../assets/img/index/function1/act_3.png')" alt="">
            <p>签到签退</p>
            <p>线下参加活动可通过扫描二维码或者定位功能签到签退，方便快捷</p>
          </div>

        </div>
        <div class="item_thu">
          <div align="center">
            <img v-lazy="require('../../assets/img/index/function1/act_4.png')" alt="">
            <p>完结加分</p>
            <p>学生可以在APP、H5、WEB端报名参加活动，多端互动，想你所想</p>
          </div>
        </div>
      </div>
    </div>

    <div class="func_section2">
      <img v-lazy="require('../../assets/img/index/function1/function_2.png')" alt="">
    </div>

    <div class="func_section3">
      <div class="container_self">

        <div class="item_thu" align="center">
          <p>第二课堂成绩单-支持按需定制</p>
          <p>PE校园可将学生活动、申请类学分数据按条件生成成绩单，便于高校对学生第二课堂情况的统计和管理；</p>
        </div>

        <div class="item_thu" align="center">
          <img v-lazy="require('../../assets/img/index/function1/function_3.png')" alt="">
        </div>


        <div class="item_thu" align="center">
          <img v-lazy="require('../../assets/img/index/function1/function_4.png')" alt="">
        </div>

        <div class="item_thu" align="center">
          <p>学分预警系统</p>
          <p>PE校园具备灵活的学分上下限定义和预警系统，帮助高校更高效的管理和提醒第二课堂学分情况</p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

    export default {

        name: 'function',
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
  .function1 .container_self{
    margin: 0 auto;
    width: 95%;
    overflow: hidden;
  }

  @media (min-width: 1200px){
    .function1 .container_self {
      width: 60%!important;
    }
  }

  .function1 .index-banner {
    height: 34.5vw;
    background: url(../../assets/img/index/function1/banner_4.png) center no-repeat;
    background-size: cover;
    text-align: center;
    color: #fff;
    position: relative;
  }
  .function1 .index-banner div {
    width: 23%;
    position: absolute;
    right: 17%;
    top: 30%;
  }
  .function1 .fadeInRight {
    -webkit-animation-name: fadeInRight;
    animation-name: fadeInRight;
  }
  .function1 .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .function1 .index-banner div img {
    width: 100%;
  }
  .function1 .index-banner img {
    vertical-align: middle;
  }
  .function1 .index-banner img {
    border: 0;
  }

  /*区域1*/
  .function1 .func_section1{
    overflow: hidden;
    padding: 150px 0 0 0;
  }
  .function1 .func_section1 .item_thu{
    width: 100%;
  }
  .function1 .func_section1 .item_thu img{
    width: 30%;
  }
  @media (min-width: 760px) and (max-width: 1200px){
    .function1 .func_section1 .item_thu{
      width: 50%;
      float: left;
    }
    .function1 .func_section1 .item_thu img{
      width: 50%;
    }
  }
  @media (min-width: 1200px){
    .function1 .func_section1 .item_thu{
      width: 25%;
      float: left;
    }
    .function1 .func_section1 .item_thu img{
      width: 80%;
    }
  }

  .function1 .func_section1 .item_thu p:nth-of-type(1) {
    font-size: 24px;
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
  }
  .function1 .func_section1 .item_thu p:nth-of-type(2) {
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #898888;
    width: 80%;
    padding: 10px 0;
  }

  /*区域2*/
  .function1 .func_section2{
    overflow: hidden;
    width: 100%;
  }
  .function1 .func_section2 img{
    width: 100%;
  }

  /*区域3*/
  .function1 .func_section3{
    overflow: hidden;
    width: 100%;
    padding-top: 20px;
  }

  .function1 .func_section3 .item_thu{
    width: 100%;
  }
  .function1 .func_section3 img{
    width: 50%;
    margin: 10px 0;
  }
  @media (min-width: 760px){
    .function1 .func_section3 .item_thu{
      width: 50%;
      float: left;
    }
    .function1 .func_section3 img{
      width: 80%;
      margin: 0;
    }
  }

  .function1 .func_section3 .item_thu p:nth-of-type(1) {
    font-size: 24px;
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
  }
  .function1 .func_section3 .item_thu p:nth-of-type(2) {
    font-size: 14px;
    line-height: 24px;
    color: #898888;
    width: 80%;
    padding: 10px 0;
  }


  @media screen and (min-width: 767px){
    .function1 .func_section4 .content {
      top: 40%;
      left: 20%;
    }
  }


</style>
