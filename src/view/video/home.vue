<template>
  <div class="video-home">
    <div class="wrap">
      <div class="section" v-for="section in sections">
        <div class="block1">
          <div class="block_head">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-video"></use>
            </svg>
            <a href="#/video/class">{{section}}</a>
          </div>
          <div class="item_group">
            <div class="item" v-for="item in handleData(section)" @click="open(item)" >
              <div class="item_inner">
                <el-image :src="item.url"  alt="" lazy>
                </el-image>
                <p>{{item.name}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
    export default {
        name: 'home',
        components: {

        },
        data () {
            return {
                sections:['推广','健身','教学','裁判'],
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
            }
        },
        methods: {
            open(item){
              console.log(item.id);
              this.$router.push(
                  {
                      path: '/video/video',
                      query: {
                          id: item.id
                      }
                  }
              )
            },
            //处理表格数据
            handleData(section){
                let temp_data = this.remote_data.filter(data=>this.filter(data,section));
                return temp_data.slice(0,5);
            },
            //搜索筛选
            filter(val,section){
                return (section === val.class);
            },
        },
        mounted() {
        },
        created(){
        }
    }
</script>

<style scoped>
  .video-home .wrap {
    margin: 0 auto;
    //background:#dcdfe6;
    color: #000;
    overflow: hidden;
  }

  .icon {
    width: 1em;
    height: 1em;
    font-size: 36px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  /*手机端*/
  @media (max-width: 760px){
    .wrap {
      margin: 0;
      width: 100%;
    }
    .video-home .wrap .item{
      width: 50%;
    }
    .video-home .wrap .item img{
      width: 100%;
    }
  }

  @media (min-width: 760px) {
    .wrap {
      width: 100%;
      margin:0;
    }
    .video-home .wrap .item{
      width: 20%;
    }
    .video-home .wrap .item img{
      width: 100%;
    }
  }
  .video-home .section{
    height: auto;
    margin: 20px 0;
  }
  .video-home .item_group{
    overflow: hidden;
    width: 95%;
    margin: auto;
  }

  .video-home .wrap .item img{
    width: 100%;
    border-radius: 14px 14px 0 0;
  }

  .item{
    overflow: hidden;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    margin-bottom: 10px!important;
  }

  .video-home .item_inner{
    margin: 10px;
    transition: all 0.3s;
    background-color: white;
    border:3px solid #ebebeb;
    box-sizing:border-box;
    border-radius: 14px;
  }

  .video-home .item_inner:hover{
    margin: 0;
  }

  .video-home a, a:hover{
    text-decoration: none;
    cursor: pointer;
  }

  .video-home .wrap .item p{
    padding: 5px 0 10px 5px ;
    transition: color 0.3s;
    color: #000;
  }

  .video-home .wrap .item:hover p{
    color: #409EFF;
  }
  .video-home .wrap .block_head{
    line-height: 36px;
    margin-bottom:16px;
  }

  .video-home .wrap .section a{
        color: #000;
       font-weight: 400;
       font-size: 20px;
       line-height: 36px;
       transition: color 0.5s;
   }
  .video-home .wrap .section a:hover, .video-home .wrap .section a:visited:hover{
    font-weight: 400;
    font-size: 20px;
    line-height: 36px;
    color: #409EFF;
  }
  .video-home .wrap .section a:visited{
    color: #000;
    font-weight: 400;
    font-size: 20px;
    line-height: 36px;
    transition: color 0.5s;
  }
</style>

