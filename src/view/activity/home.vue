<template>
  <div class="activity-home">
    <div class="block" v-show="!detail">
      <template>
        <template>
          <el-input
            type="text"
            v-model="search"
            prefix-icon="el-icon-search"
            style="width: 150px;margin-left:10px;"
            placeholder="输入关键字搜索"></el-input>
        </template>


        <div v-for="scope in handleData()" @click="handleClick(scope)">
          <el-card shadow="hover" class="item">
            <el-image
              style=""
              class="item_img"
              :src="scope.url"
              :fit="'scale-down'"
              >
            </el-image>

            <div class="item_right">
              <div class="inner">
                <span style="color: #e95f13;display: block">{{ scope.title }}<br/></span>
                <span style="color: #e95f13;float: right">{{ scope.status }}<br/></span>
                <span style="display: block;">{{ filter_description(scope.name)}}&nbsp;&nbsp;|&nbsp;&nbsp;{{ filter_time(scope.date)}}</span>
                <span style="margin: 10px 0 0 10px;display: block">{{ filter_description(scope.description) }}</span>
              </div>
            </div>
          </el-card>
        </div>
        <el-card shadow="hover" class="item">
          <center>已经到底了</center>
          <br>
        </el-card>
      </template>

      <el-pagination
        class="_self"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper, sizes"
        :total="total">
      </el-pagination>


    </div>

    <el-card shadow="hover" class="notice_detail" v-show="detail">
      <el-page-header @back="goBack" style="width: 100%;">
        <template slot="content"><h1>{{detail_item.title}}</h1>
          <!--:disabled="detail_item.status !='报名阶段'"-->
          <el-button style="float: right;display: inline-block" type="primary" @click="handleSign()" round>报名参加</el-button>
        </template>

      </el-page-header>
      <detail_activity :detail_item="detail_item"></detail_activity>
    </el-card>
  </div>
</template>

<script>
  import detail_activity from '@/view/activity/detail_activity.vue'
  export default {
    components:{
        detail_activity,
    },
    data () {
      return {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          search: '',
          detail:false,
          currentPage: 1,
          pageSize: 10,
          total:0,
          activity_status:true,
          tableData: [{
              title:'',
              date: '',
              name: '',
              status: '',
              description: '',
          }, ],
          status: ['未审核','已审核','报名阶段','待完结','已完结'],
          remote_single_data:{
              id: 3,//wuyong
              activityName: "ddd",
              activityContent: "ssss",//简介
              imagePath: "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\static\\upload\\123_20200416100430.PNG",
              publisherId: 3,//发布人ID
              publishData: "2012-12-11T16:00:00.000+0000",//发布时间
              schoolId: 2,
              collegeId: 2,
              startTime: "2020-09-16T10:10:11.000+0000",//活动开始
              endTime: "2020-09-18T10:10:26.000+0000",//
              status: 1,//0未审核 1审核 2报名 3待完结 4完结
              college: null,//所属学院
              registrationClosingTime: null,//报名开始
              registrationStartTime: null,
              reviewerId: null,//审核人
              contact: null,//联系人
              contactPhone: null,
              wayRegistration: null,//报名方式
              activityArea: null,//活动区域
              eventLocation: null,//活动地点
              activityClassification: null,//活动分类
              participationFee: null,//费用
              collegeList: null,
              classList: null,
              peopleNum: null,//人数
              signout: null,//签退
              fieldClock: null
          },

          detail_item:{
              id:0,
              title:'跆拳道体验活动',
              date: '2019-10-17 08:30',
              name: '体育学院',
              status:'报名阶段',
              description: '本活动意在百团纳新​时，设立多种体验游戏，帮助没有接触过跆拳道的同学，认识跆拳道，加深理解，同时促进跆拳道的传播，帮助大学生学习一项体育技能，丰富大学生活，锻炼身体。',
              checker: {
              region:'体育学院',
              name:'Bob'
              },
              class:'文化艺术与身心发展',
              position:'A餐水房旁边',
              fee:'免费',
              fee_description:'免费活动',
              signOut:true,
              signUp_time_start:'2019-10-11 08:00',
              signUp_time_end:'2019-10-19 12:00',
              activity_time_start:'2019-10-19 08:30',
              activity_time_end:'2019-10-19 16:47',
              numberOfPeople:'无限制',
              college_checkAll: true,
              college:['学院1','学院2','学院3','学院4','学院5','学院6','学院7','学院8','学院9','学院10'],
              activity_grade_checkAll: true,
              activity_grade:['2015','2016','2017','2018','2019','2020','2021'],
              contact_name:'崔老师 ',
              contact_method:'18300255591',
              sign_method:'报名制',
              delivery: false,
              imageUrl:'',
              now_people:'50'
          },
      }
    },

    methods: {

        //列表点击事件
        handleClick(val) {
            this.detail=true;
            this.detail_item.id = val.id;
            this.detail_item.title = val.title;
            this.detail_item.status = val.status;
            this.detail_item.description = val.description;
            window.scrollTo(0, 0);

        },

        //处理表格数据
        handleData(){
            let temp_data = this.tableData.filter(data=>this.filter(data));
            this.total=temp_data.length;
            return temp_data.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        },

        //搜索筛选
        filter(val){
            return (!this.search || val.title.toLowerCase().includes(this.search.toLowerCase()));
        },

        //过长的内容转换为省略号  宽度过低时才会采取的方案
        filter_description(val){
            if(val.length>30 && document.body.clientWidth<760){
                return val.slice(0,30)+'...';
            }
            else{
                return val;
            }
        },

        filter_time(val){
            return val.slice(0,10);
        },
        //每页条数
        handleSizeChange(val) {
            this.pageSize=val;
        },

        //当前页数
        handleCurrentChange(val) {
        },

        //报名按钮
        handleSign(){
            const url = '/api/activity/signUp/'+this.detail_item.id;
          this.$api.get(url).then(res => {
                if (res.code === 0) {
                    this.$message.success('恭喜你，报名成功');
                }
                else{
                    this.$message.error(res.msg);
                }
            })
        },

        //返回按钮
        goBack() {
            this.detail=false;
            this.activity_status=true;
        },
        mappingObject(obj){
            let data = {};
            data.id = obj.id;
            data.title = obj.activityName;
            data.date = obj.publishData;
            data.name = obj.publisherId;
            data.description = obj.activityContent;
            let str = obj.imagePath.split('\\');
            data.url = 'http://www.xiaoyuanpe.com/'+str[str.length-1];
            data.status = this.status[obj.status];
          return data;
        },
        //请求活动列表
        requestActivityList(){
            const url = '/api/activity/queryActivityListAll';
            this.$api.get(url).then(res => {
                let _this = this;
                if (res.code === 0) {
                    this.tableData=[];
                    if(res.data != null){
                        //因为是一个数据所以不是list，没有长度
                        if(res.data.length === undefined){
                            this.tableData.push(this.mappingObject(res.data));
                        }else{
                            for(let i = 0;i < res.data.length; ++i){
                                this.tableData.push(this.mappingObject(res.data[i]));
                            }
                        }
                    }
                    this.total=this.tableData.length;
                }
            })
        }
    },

    created() {
        this.requestActivityList();
    }
  }
</script>

<style >

  .activity-home{
    width: 100%;
  }
  .activity-home .block{
    width:100%;
    height: 100%;
    padding-top: 20px;
    border-radius: 14px;
  }
  .activity-home .notice_detail{
    background-color: white;
    height: 100%;
    border:3px solid #ebebeb;
    padding: 20px;
  }

  @media screen and (min-width: 1140px){
    .activity-home .notice_detail {
      width: 1090px;
      margin: 0 auto;
    }
    .activity-home  ._self{
      width: 1127px!important;
      margin: 0 auto;
    }
  }

  .activity-home  ._self{
    position:fixed;
    width: 100%;
    bottom: 0;
    background-color: white;
  }

  .activity-home h1{
    font-weight: 300;
  }

  .activity-home .el-page-header__content {
    width: 100% !important;
  }

  .activity-home .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: white!important;
  }
  .activity-home .el-table td, .el-table th.is-leaf {
     border-bottom: 0 solid #EBEEF5!important;
  }

  .activity-home .item{
    border-radius: 14px;
    overflow: hidden;
    padding: 0!important;
    margin: 15px 0;
  }

  .activity-home .item .el-card__body{
    padding: 0!important;
  }

  @media screen and (min-width: 760px){
    .activity-home .item_img{
      border-radius: 14px;
      overflow: hidden;
      width: 60%;
      padding: 0;
      display: inline-block;
      max-height: 20%;
    }
    .activity-home .item_img img{
      width: 100%;
      border-radius: 14px;
    }
    .activity-home .item_right{
      width: 40%;
      height: 100%;
      border-radius: 14px;
      overflow: hidden;
      padding: 0;
      float: right;
    }
    .activity-home .item_right .inner{
      padding: 10px;
    }
  }



  @media screen and (max-width: 760px){
    .activity-home .item {
      width: 95%;
      margin: 15px auto;
    }
    .activity-home .item_img {
      width: 100%;
      display: block;
    }
    .activity-home .item_img{
      border-radius: 14px;
    }
    .activity-home .item_img img{
      border-radius: 14px;
    }
    .activity-home .item_right .inner{
      padding: 10px;
    }
  }

</style>
