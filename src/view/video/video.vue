<template>
  <div class="bg">
    <div class="video-video">
      <div class="video-head">
        <div style="overflow: hidden;">
          <h2>{{show_video.name}}</h2>
        </div>

        <div style="overflow: hidden;font-size: 12px;line-height: 36px">
          <a  href="#/video/class" style="float: left">{{show_video.class}}</a>
          <p style="float: left;margin-left: 20px">{{show_video.time}}</p>
        </div>

        <div style="overflow: hidden;font-size: 12px;line-height: 15px;">
          <p style="float: left">{{show_video.count}}次播放</p>
        </div>
      </div>
      <div class="video-player">

        <video-player
          style="width: 100%;"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
          class="video-player vjs-custom-skin"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)">
        </video-player>

      </div>
      <div class="video-recommend">
        <div style="padding-left: 30px;overflow:hidden;">
          <h2>相关视频</h2>
          <div class="video-recommend-item" v-for="(item,i) in show_data" @click="open(item)" v-if="i<recommend_count">
            <img :src="item.url"  alt=""/>
            <p>{{item.name}}</p>
            <p>{{item.count}}次播放</p>
          </div>
        </div>

      </div>
      <div class="video-introduce">
        <h2>视频简介</h2>
        <p>{{description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    require('video.js/dist/video-js.css')
    require('vue-video-player/src/custom-theme.css')
    import { videoPlayer } from 'vue-video-player'

    export default {
        name: 'home',
        components: {
            videoPlayer
        },
        data () {
            return {
                description:"hello!",
                recommend_count:4,
                show_data:[
                    {
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:1,
                        name:"视频1",
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学视频"

                    },
                    {
                        name:"视频2",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:2,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学视频"
                    },
                    {
                        name:"视频3",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:3,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学视频"
                    },
                    {
                        name:"视频4",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:4,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学视频"
                    },
                    {
                        name:"视频5",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:5,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学视频"
                    },
                    {
                        name:"视频6",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:6,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学视频"
                    },
                ],
                playerOptions: {
                    playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, // 如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    controls:true,
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [
                        {
                            type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                            src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm' // url地址
                        },

                    ],
                    hls: true,
                    //poster: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 你的封面地址
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        volumeMenuButton: {
                            inline: false,
                        },
                        timeDivider: true,//时间分割线
                        durationDisplay: true,//总时间
                        remainingTimeDisplay: false,//剩余播放时间
                        progressControl: true, // 进度条
                        fullscreenToggle: true, // 全屏按钮


                    },
                },
                remote_data:[
                    {
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:1,
                        name:"视频1",
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"

                    },
                    {
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:2,
                        name:"视频2",
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"推广"

                    },{
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:3,
                        name:"视频3",
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"健身"

                    },{
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:4,
                        name:"视频4",
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"裁判"

                    },{
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:5,
                        name:"视频5",
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"

                    },{
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:6,
                        name:"视频6",
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"

                    },
                    {
                        name:"视频7",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:7,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"健身"
                    },
                    {
                        name:"视频8",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:8,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"裁判"
                    },
                    {
                        name:"视频9",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:9,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频10",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:10,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频11",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:11,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:12,
                        name:"视频12",
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"

                    },

                    {
                        name:"视频13",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:13,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频14",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:14,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频15",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:15,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频16",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:16,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频17",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:17,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:18,
                        name:"视频18",
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"

                    },

                    {
                        name:"视频19",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:19,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频20",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:20,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频21",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:21,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频22",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:22,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频23",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:23,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:24,
                        name:"视频24",
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"

                    },

                    {
                        name:"视频25",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:25,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频26",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:26,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频27",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:27,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频28",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:28,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                    {
                        name:"视频29",
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        id:29,
                        count:21321,
                        mu:50,
                        time:"2020-07-04 11:51:46",
                        class:"教学"
                    },
                ],
                show_video:{
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    id:1,
                    name:"教学视频1",
                    count:21321,
                    mu:50,
                    time:"2020-07-04 11:51:46",
                    class:"教学视频"
                },
                dev_shift:true,
            }
        },
        methods: {
            open(item){
                window.location.href="#/video/video?id="+item.id;
                this.shift(item.id);
            },
            shift(id){
                this.show_video = this.remote_data[id-1];
                if(this.dev_shift){
                    this.playerOptions.sources[0].src="//vjs.zencdn.net/v/oceans.mp4";
                }
                else {
                    this.playerOptions.sources[0].src="https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm";
                }
                this.dev_shift = !this.dev_shift;

            },
            // 播放回调
            onPlayerPlay(player) {
                console.log('player play!', player)
            },

            // 暂停回调
            onPlayerPause(player) {
                console.log('player pause!', player)
            },

            // 视频播完回调
            onPlayerEnded($event) {
                console.log(player)
            },

        },
        computed:{
            player(){
                return this.$refs.videoPlayer.player;
            }
        },
        mounted() {
        },
        created(){
            this.show_video = this.remote_data[this.$route.query.id-1];
        },

    }
</script>

<style scoped>
  .bg{
    width: 100%;
    height: 100%;
    background:#dcdfe6;
  }
  .video-video {
    width: 100%;
    overflow: hidden;
    padding-top: 20px;
    margin: 0;
    color: #000;
  }
  .video-video .video-recommend{
    display: none;
  }
  @media (min-width: 1414px) {
    .video-video {
      width: 90%;
      margin: 0 auto;
    //background:#dcdfe6;
      color: #000;
      overflow: hidden;
    }
  }
  .icon {
    width: 1em;
    height: 1em;
    font-size: 36px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .video-video .video-head{
    margin-bottom: 20px
  }
  .video-video a, a:hover {
    text-decoration: none;
    cursor: pointer;
  }
  .video-video a{
    font-weight: 400;
    transition: color 0.3s;
  }
  .video-video a:hover{
    color: #409EFF;
  }


  .video-video .video-recommend{
    display: none;
  }

  .video-video .video-player{
    width: 100%;
    min-width: 250px;
  }

  @media (min-width: 1414px) {
    .video-video .video-player{
      width: 70%;
      float: left;
    }

    .video-introduce{
      width: 70%;
    }

    .video-video .video-recommend{
      display: inherit;
      width: 30%;
      background-color: #dcdfe6;
      float:left;
    }
    .video-video .video-recommend h2{
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
      vertical-align: middle;
      margin:10px 0 0 10px;
    }

    .video-video .video-head h2{
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
      float: left;
      vertical-align: middle;
    }

    .video-recommend-item{
      margin: 20px 0;
      width: 100%;
      overflow: hidden;
      cursor: pointer;
    }
    .video-recommend-item img{
      margin: 0 10px;
      width: 40%;
      float: left;
    }
    .video-recommend-item p{
      margin: 10px 10px;
      width: 40%;
      float: left;
    }
    .video-recommend-item > p:nth-child(3){
      margin: 10px 10px;
      width: 40%;
      float: left;
      font-size: 10px;
    }
  }

  .video-introduce{
    overflow: hidden;
    margin:20px 0;
    float: left;
  }
  .video-introduce h2{
    font-weight: 400;
    line-height: 24px;
    vertical-align: middle;
  }
  .video-introduce p{
    margin-top:20px;
  }
  @media (max-width: 1413px) {
    .video-introduce{
      width: 100%;
    }
  }


</style>

