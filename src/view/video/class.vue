<template>
  <div class="video-class">
    <div class="wrap">
      <el-input
        type="text"
        v-model="search"
        prefix-icon="el-icon-search"
        style="width: 200px;margin:10px 0"
        placeholder="输入视频名称搜索"></el-input>
      <br>

      <el-radio-group v-model="checkedSection" >
        <el-radio-button v-for="section in sections" :key="section" :label="section"></el-radio-button>
      </el-radio-group>

      <div class="section" >
        <div class="block1">
          <div class="block_head">
            <!--
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-video"></use>
            </svg>
            <a>{{checkedSection}}</a>
            -->
          </div>
          <div class="item_group">
            <div class="item" v-for="item in handleData()" @click="open(item)" >
              <div class="item_inner">
                <img v-lazy="item.url"  alt="" />

                <p>{{item.name}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <el-pagination
      class="_self"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next, jumper, sizes">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: 'class',
        components: {

        },
        data () {
            return {
                checkAll: true,
                isIndeterminate: false,
                currentPage: 1,
                pageSize: 10,
                total:0,
                search: '',
                checkedSection:'推广',
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
            handleData(){
                let temp_data = this.remote_data.filter(data=>this.filter(data));
                this.total = temp_data.length;
                return temp_data.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
            },
            //搜索筛选
            filter(val){
                return (!this.search || val.name.toLowerCase().includes(this.search.toLowerCase())) && (this.checkedSection === val.class);
            },

            //分类筛选


            //每页条数
            handleSizeChange(val) {
                this.pageSize=val;
                /*console.log(`每页 ${val} 条`);*/
            },

            //当前页数
            handleCurrentChange(val) {
                /*console.log(`当前页: ${val}`);*/
            },
        },
        mounted() {
        },
        created(){
            this.total = this.remote_data.length;
        }
    }
</script>

<style scoped>
  .video-class{
    min-height: 700px;
  }
  .video-class .wrap {
    //background:#dcdfe6;
    color: #000;
    overflow: hidden;
    width: 100%;
    margin:0;
  }
  .icon {
    width: 1em;
    height: 1em;
    font-size: 36px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  /*手机端每行两个无空隙*/
  @media (max-width: 760px){
    .video-class .wrap .item{
      width: 50%;
    }
    .video-class .item_group{
      width: 100% !important;
    }
  }

  @media (min-width: 760px) and (max-width: 1414px){
    .video-class .wrap .item{
      width: 25%;
    }
  }
  @media (min-width: 1414px) {
    .video-class .wrap .item{
      width: 20%;
    }
  }
  .video-class .section{
    height: auto;
    margin: 20px 0;
  }
  .video-class .item_group{
    overflow: hidden;
    width: 95%;
    margin: auto;
  }

  /*手机端不设置空隙*/
  @media (max-width: 760px){
    .video-class .item_inner{
      margin: 0!important;
    }
  }
  .video-class .wrap .item img{
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

  .video-class .item_inner{
    margin: 10px;
    transition: all 0.3s;
    background-color: white;
    border:3px solid #ebebeb;
    box-sizing:border-box;
    border-radius: 14px;
  }

  .video-class .item_inner:hover{
    margin: 0;
  }

  .video-class a, a:hover{
    text-decoration: none;
    cursor: pointer;
  }

  .video-class .wrap .item p{
    padding: 5px 0 10px 5px ;
    transition: color 0.3s;
    color: #000;
  }

  .video-class .wrap .item:hover p{
    color: #409EFF;
  }
  .video-class .wrap .block_head{
    line-height: 36px;
    margin-bottom:16px;
  }

  .video-class .wrap .section a{
    font-weight: 400;
    font-size: 20px;
    line-height: 36px;
    cursor: default;
  }
  .video-class .wrap .section a:hover{

  }

  .video-class  ._self{
    margin-bottom: 10px;
  }

</style>

