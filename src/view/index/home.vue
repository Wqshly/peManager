<template>
  <div class="homepage">
    <div class="index-banner">
      <!-- 背景动图 -->
      <div class="video-box">
        <video class="lazy" loop autoplay muted playsinline poster="../../assets/prepost.png">
          <source src="../../assets/home.mp4" type="video/mp4">
        </video>
        <div class="overlay"></div>
      </div>
      <div class="index-font-box">
        <h1>校园体育,提升健康</h1>
        <p>每天锻炼一小时，健康工作50年，幸福生活一辈子</p>
      </div>
    </div>

    <div class="section-1">
      <div class="container_self">
        <carousel v-if="items1.length !== 0" :data="items1" :type="'card'"/>
      </div>
    </div>

    <div class="section-2">
      <div class="container_self">
        <div class="container_self description">
          <h2>PE校园-健康生活每一天</h2>
          <div class="detail">
            <p>
              校园PE，由青岛新体创体育产业集团有限公司研发，青岛指尖跃动科技有限公司提供技术支持。
            </p>
            <p>
              校园PE旨在促进学生每天锻炼一小时，用运动时长获取PE体育学分，从而保证学生运动时长，乐享健康生活。
            </p>
          </div>
        </div>

        <div id="section2-container">
          <div class="section2-item" v-for="e in section2">
            <img v-lazy="require('../../assets/img/index/home/section2/'+e.url)" alt="">
            <p>{{e.text}}</p>
          </div>
        </div>
        <div id="section2-phone-container">
          <div class="section2-phone-item">
            <img v-lazy="require('../../assets/img/index/home/section2/fanchuan.jpg')" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="section-3">
      <div class="container_self">
        <div class="description">
          <h2 align="center">PE校园优势</h2>
          <div class="container_self detail">
            <p align="center">&nbsp;&nbsp;&nbsp;PE校园专注于为高校学生的综合能力提升提供系列服务，保障大学生不断成长的同时，也在不断改善自身产品，为学生和高校提供更好的服务。
            </p>
          </div>
        </div>
      </div>

      <div id="section3-container">
        <div class="section3-item" v-for="e in section3">
          <img v-lazy="require('../../assets/img/index/home/section3/'+e.url)" alt="">
          <h3 align="center">{{e.h3}}</h3>
          <p align="center">{{e.p}}</p>
        </div>
      </div>
    </div>

    <div class="section-4">
      <div class="container_self">
        <div class="title">
          <h2 style="text-align: center">PE校园智能</h2>
        </div>
        <div class="content-box">
          <div class="row upper-row">
            <div class="col-xs-12 col-md-4">
              <div class="card right-pic">
                <div class="word">
                  <h3 class="title">
                    成绩单定制
                  </h3>
                  <p>
                    PE校园可根据高校需求个性化定制成绩单，包含成绩单界面布局、各数据维度等方面的定制，支持一键导出打印等功能，在通用数据上帮助高校管理第二课堂的同时，差异化展示各校学生的综合素质情况。
                  </p>
                </div>
                <div class="icon transcript"></div>
              </div>
            </div>
            <div class="col-xs-12 col-md-4 col-md-offset-4">
              <div class="card left-pic">
                <div class="icon dataopen"></div>
                <div class="word">
                  <h3 class="title">
                    数据打通
                  </h3>
                  <p>
                    PE校园可实现与其他系统的互联互通，可实现基本信息同步维护，数据便捷查询；PE校园产生的活动、部落、学分等数据也可同步至学校，便于学校对大数据进行挖掘分析。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row bottom-row">
            <div class="col-xs-12 col-md-4">
              <div class="card right-pic">
                <div class="word">
                  <h3 class="title">
                    精准数据运算定制
                  </h3>
                  <p>
                    PE校园提供符合学校要求的定制数据结果，展现第二课堂教育成果，为学校提供更好的第二课堂教育以及学生素质教育指导。
                  </p>
                </div>
                <div class="icon work"></div>
              </div>
            </div>
            <div class="col-xs-12 col-md-4 col-md-offset-4">
              <div class="card left-pic">
                <div class="icon stastic"></div>
                <div class="word">
                  <h3 class="title">
                    第二课堂数据分析
                  </h3>
                  <p>
                    PE校园提供第二课堂数据多维度多条件的统计和分析，将各项结果准确图形化展示，并支持导出数据报告，便于学校对第二课堂大数据进行挖掘分析，对第二课堂的工作进行回顾和改进。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-5">
      <div class="container_self">
        <h2>选择PE校园<br>让大学生活更简单
        </h2>
        <div class="detail">
          <p>PE校园未来将为大学生成长提供一站式的全面服务，</p>
          <p>
            二课、学习、培训、就业、交友、娱乐...你想要的，PE校园都有！
          </p>
          <p>
            选择PE校园，让大学生活更简单!
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import carousel from "../../components/common/carousel";

  export default {
    components: {
      carousel,
    },
    data() {
      return {
        /*轮播图 走马灯*/
        items1: [
          {
            name: "1",
            url: "http://www.xiaoyuanpe.com/1.png"
          },
          {
            name: "2",
            url: "http://www.xiaoyuanpe.com/2.png"
          },
          {
            name: "3",
            url: "http://www.xiaoyuanpe.com/3.png"
          },
        ],
        section2: [
          {
            text: '乒乓球',
            url: 'pingpang.jpg',
          },
          {
            text: '羽毛球',
            url: 'yumao.jpg',
          },
          {
            text: '篮球',
            url: 'lanqiu.jpg',
          },
          {
            text: '足球',
            url: 'zuqiu.jpg',
          },
          {
            text: '铅球',
            url: 'qianqiu.jpg',
          },
          {
            text: '帆船',
            url: 'fanchuan.jpg',
          },
          {
            text: '跳高',
            url: 'tiaogao.jpg',
          },
          {
            text: '50米跑',
            url: 'paobu.jpg',
          },
          {
            text: '跨栏',
            url: 'kualan.jpg',
          },
        ],
        section3: [
          {
            url: '专业系统.png',
            h3: '专业系统',
            p: '集成课程体系，学校培养评估，学生素质评价为一体的综合素质管理平台',
          },
          {
            url: '多端.png',
            h3: '多端形态',
            p: 'APP、H5、小程序、PC、Web多端形态，满足不同的使用场景需求',
          },
          {
            url: '个性定制.png',
            h3: '个性定制',
            p: '针对不同高校和学生群体需求,定制符合其自身发展需求的功能',
          },
          {
            url: '升级.png',
            h3: '持续升级',
            p: '不断优化迭代，持续升级，为第二课堂的前行铺平道路',
          },
        ],
      }
    },
    methods: {
      lazy() {
        document.addEventListener("DOMContentLoaded", function () {
          var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

          if ("IntersectionObserver" in window) {
            var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
              entries.forEach(function (video) {
                if (video.isIntersecting) {
                  for (var source in video.target.children) {
                    var videoSource = video.target.children[source];
                    if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                      videoSource.src = videoSource.dataset.src;
                    }
                  }

                  video.target.loadData();
                  video.target.classList.remove("lazy");
                  lazyVideoObserver.unobserve(video.target);
                }
              });
            });

            lazyVideos.forEach(function (lazyVideo) {
              lazyVideoObserver.observe(lazyVideo);
            });
          }
        });
      },

    },
    mounted() {

    },
    created() {
      this.lazy();
    }
  }
</script>

<style scoped>
  #app {
    width: 100%;
  }

  /*MP4*/
  .homepage .video-box video {
    width: 100%;
    height: 100%;
  }

  .homepage .index-banner {
    position: relative;
    width: 100%;
  }

  .homepage .index-banner .video-box .overlay {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: -1px; /**/
    opacity: .7;
    background: #1C1D21;
  }

  .homepage .index-banner .index-font-box {
    display: none;
  }

  @media (min-width: 760px) {
    .homepage .index-banner .index-font-box {
      position: absolute;
      display: inherit;
      top: 28%;
      left: 10%;
      font-weight: 200;
    }
  }

  .homepage .index-banner .index-font-box h1 {
    font-size: 40px;
    color: #fff;
  }

  .homepage .index-banner .index-font-box p {
    margin-top: 15px;
    font-size: 20px;
    color: #898888;
  }

  /*自适应margin*/
  .homepage .container_self {
    overflow: hidden;
    margin: 0 auto;
    width: 95%;
  }

  @media (min-width: 1200px) {
    .homepage .container_self {
      width: 60% !important;
    }
  }

  /*文字*/
  .homepage .container_self .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    font-family: inherit;
    font-weight: 500 !important;
    line-height: 1.1;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .homepage .container_self * {
    box-sizing: border-box;
    font-family: "Microsoft Yahei", sans-serif;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  .homepage .container_self p {
    font-weight: 500 !important;
    font-size: 14px !important;
  }

  .homepage .container_self h2 {
    font-size: 30px !important;
    display: block;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }

  /*区域一*/
  .homepage .section-1 {
    width: 100%;
    margin: 35px 0 15px 0;
    display: none;
    background: transparent;
  }

  @media (min-width: 760px) {
    .homepage .section-1 {
      display: inherit;
    }
  }

  .index_sidebar .el-table__row {
    cursor: pointer;
  }

  /*区域2*/
  .homepage .section-2 {
    position: relative;
    overflow: hidden;
    padding-bottom: 40px;
  }

  .homepage .section-2 .description {
    padding-top: 50px;
    margin-bottom: 20px;
    text-align: center;
  }

  .homepage .section-2 .description .detail {
    margin-top: 20px;
  }

  #section2-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  #section2-phone-container {
    width: 100%;
    flex-wrap: wrap;
    display: none;
    justify-content: center;
  }

  .section2-item {
    display: flex;
    width: 33%;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .section2-phone-item {
    display: flex;
    width: 90%;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .section2-phone-item img {
    width: 100%;
  }

  .section2-item p {
    font-size: 12px;
    padding-top: 5px;
  }

  .section2-item img {
    width: 100%;
  }

  /*页面最窄*/
  @media (max-width: 759px) {
    #section2-container {
      display: none;
    }

    #section2-phone-container {
      display: flex;
    }
  }


  /*区域3*/
  .homepage .section-3 {
    background-image: url(../../assets/img/index/home/section3/index_banner.png);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    color: white;
    overflow: hidden;
    padding-bottom: 50px;
  }

  .homepage .section-3 .description {
    padding-top: 25px;
  }

  .homepage .section-3 p {
    color: rgba(255, 255, 255, 0.7);
  }

  .homepage .section-3 h3 {
    color: #fff;
  }

  #section3-container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  #section3-container .section3-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 0;
  }

  .section3-item p, .section3-item h3 {
    width: 70%;
  }

  .section3-item img {
    width: 10%;
  }

  /*页面中等时每行两个*/
  @media (min-width: 760px) and (max-width: 1200px) {
    #section3-container .section3-item {
      width: 50%;
    }

    .section3-item img {
      width: 15%;
    }
  }

  /*页面最宽时每行四个*/
  @media (min-width: 1200px) {
    #section3-container {
      width: 70%;
      margin: 0 auto;
    }

    #section3-container .section3-item {
      width: 25%;
    }

    .section3-item img {
      width: 15%;
    }
  }

  /*区域四*/
  .homepage .section-4 {
    overflow: hidden;
    padding: 30px 0;
  }

  .homepage .section-4 .bottom-row {
    padding-top: 100px;
  }

  .homepage .section-4 h3 {
    float: left;
    font-size: 24px !important;
  }

  .homepage .section-4 .row {
    margin: 30px 0;
  }

  .homepage .section-4 .col-xs-12 {
    float: left;
    width: 100%;
  }

  .homepage .section-4 .bottom-row {
    padding-top: 100px;
  }

  .homepage .section-4 .container_self .card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .homepage .section-4 .container_self .card .word {
    width: calc(100% - 60px);
  }

  .homepage .section-4 .container_self .right-pic h3 {
    margin: 0 0 30px 0;
    float: right;
  }

  .homepage .section-4 .container_self .right-pic p {
    clear: both;
    text-align: right;
    color: #666;
  }

  .homepage .section-4 .container_self .left-pic h3 {
    margin: 0 0 30px 0;
    float: left;
  }

  .homepage .section-4 .container_self .left-pic p {
    clear: both;
    text-align: left;
    color: #666;
  }

  .homepage .section-4 .container_self .card {
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
    align-items: flex-start;
  }

  .homepage .section-4 .container_self .card .icon {
    width: 60px;
    height: 60px;
  }

  .homepage .section-4 .container_self .card .transcript {
    background: url(../../assets/img/index/home/section4/transcript.png) no-repeat;
    background-size: contain;
  }

  .homepage .section-4 .container_self .card .dataopen {
    background: url(../../assets/img/index/home/section4/dataopen.png) no-repeat;
    background-size: contain;
  }

  .homepage .section-4 .container_self .card .work {
    background: url(../../assets/img/index/home/section4/work.png) no-repeat;
    background-size: contain;
  }

  .homepage .section-4 .container_self .card .stastic {
    background: url(../../assets/img/index/home/section4/statistic.png) no-repeat;
    background-size: contain;
  }

  /*区域五*/
  .homepage .section-5 {
    text-align: center;
    background: url(../../assets/img/index/home/section5/index_choose.png) center no-repeat;
    background-size: cover;
    color: #fff;
    display: none;
    overflow: hidden;
  }

  .homepage .section-5 .container_self {
    position: relative;
    top: 11%;
  }

  @media screen and (min-width: 1024px) {
    .homepage .section-5 {
      display: block;
      height: 600px;
    }
  }

  .homepage .section-5 h3 {
    color: black;
  }

  .homepage .section-5 .container_self .detail {
    margin-top: 20px;
  }


</style>

