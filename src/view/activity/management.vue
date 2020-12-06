<template>
  <div class="activity-management">
    <div class="block" v-show="!detail">
      <div>
        <el-radio-group v-model="filter_label_outlay">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button v-for="item in roleOp" :key=item :label=item></el-radio-button>
        </el-radio-group>
      </div>

      <div>
        <el-radio-group v-model="filter_status_outlay" style="margin-top: 10px">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button v-for="item in statusOp" :key=item :label=item></el-radio-button>
        </el-radio-group>
      </div>

      <template>

        <el-table
          :data="handleData()"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="description"
            label="通告">
            <template #header >
                <el-input
                  type="text"
                  v-model="search"
                  prefix-icon="el-icon-search"
                  style="width: 150px;"
                  placeholder="输入活动名搜索">

              </el-input>

            </template>
            <template slot-scope="scope">
              <span style="color: #e95f13;">{{ scope.row.title }}<br/></span>
              <span style="margin-left: 10px">发起人：{{ filter_description(scope.row.description)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="label"
            label="权限"
            width="100">
            <template slot-scope="scope">
              <el-tag
                :type="renderColor(scope.row.label)"
                disable-transitions>{{scope.row.label}}</el-tag>
            </template>
            <template #header>
              <el-popover trigger="hover" placement="top">
                <el-tag
                  :type="renderColor('参与者')"
                  disable-transitions>参与者</el-tag>普通成员<br><br>
                <el-tag
                  :type="renderColor('签到员')"
                  disable-transitions>签到员</el-tag>有组织签到权限<br><br>
                <el-tag
                  :type="renderColor('发起人')"
                  disable-transitions>发起人</el-tag>所有权限
                <div slot="reference" class="name-wrapper">
                  权限
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            prop="status"
            label="状态"
            width="80">
          </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button  :disabled="!(scope.row.label==='签到员'||scope.row.label==='发起人')" @click="handleSignIn(scope.$index,scope.row)"  size="small">组织签到</el-button>
                <el-button  :disabled="!(scope.row.label==='发起人')" @click="handleEdit(scope.$index, scope.row)" size="small">编辑活动</el-button>
                <el-button  :disabled="!(scope.row.label==='发起人')" @click="setSigner(scope.$index, scope.row)" size="small">设置签到员</el-button>
              </template>
            </el-table-column>
        </el-table>
      </template>

    </div>
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
</template>

<script>
    import {api}  from '@/api/ajax'
    export default {
        components:{
        },
        name: 'activity-management',
        data () {
            return {
                filter_label_outlay:'全部',
                filter_status_outlay:'全部',
                detail:false,
                search: '',
                currentPage: 1,
                pageSize: 10,
                total:0,
                roleOp:['参与者','签到员','发起人'],
                statusOp:['待审核','已审核','报名阶段','待完结','已完结'],
                tableData: [
                    {
                    title:'',
                    date: '',
                    name: '',
                    status: '',
                    label:'',
                    description: '',
                  },
                ],
            }
        },

        methods: {
            //渲染TAG
            renderColor(label){
                if(label==='参与者')
                    return 'info';
                if(label==='签到员')
                    return '';
                if(label==='发起人')
                    return 'danger';
            },

            //过长的内容转换为省略号
            filter_description(val){
                if(val.length>30){
                    return val.slice(0,30)+'...';
                }
                else{
                    return val;
                }
            },

            //渲染单行颜色
            tableRowClassName({row, rowIndex}) {
                if(row.status==='已完结')
                  return 'success-row';
                if(row.status==='待完结')
                  return  'warning-row';
                if(row.status==='待审核')
                    return 'info-row';
                  return ''
            },

            handleData(){
                let temp_data = this.tableData.filter(data=>this.filter(data));
                this.total=temp_data.length;
                return temp_data.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
            },

            //搜索筛选&&标签筛选&&状态筛选
            filter(val){
                return (!this.search || val.title.toLowerCase().includes(this.search.toLowerCase())) &&( val.label === this.filter_label_outlay ||this.filter_label_outlay==='全部')&&(val.status === this.filter_status_outlay ||this.filter_status_outlay==='全部');
            },

            //组织签到
            handleSignIn(index,row){
                window.scroll(0,0);
                this.$store.commit('setActivityId',row.id);
                this.$router.push('./check');
            },
            //编辑活动
            handleEdit(index,row) {
                window.scroll(0,0);
                this.$store.commit('setActivityId',row.id);
                this.$router.push('./check');
            },
            //设置签到员
            setSigner(index,row) {
                this.$prompt('请输入签到员学号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.setS(row.id,value);
                }).catch(() => {
                });
            },
            setS(activityId,number){
                let url = '/api/activity/assignation/'+activityId+'/'+number;
                api.get(url).then(res => {
                    if (res.code === 0) {
                        this.$message.success('成功!');
                    }
                    else{
                        this.$message.error(res.msg);
                    }
                })
            },
            //每页条数
            handleSizeChange(val) {
                this.pageSize=val;
            },

            //当前页数
            handleCurrentChange(val) {
            },

            requestList(url){
                api.get(url).then(res => {
                    let _this = this;
                    if (res.code === 0) {
                        if(res.data != null){
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
            },

            requestData(){
                this.tableData = [];
                this.requestList('/api/activity/getActivityBySignin');
                this.requestList('/api/activity/getActivityByOrganizers');
                this.requestList('/api/activity/getActivityByPartner');
                this.total=this.tableData.length;
            },
            mappingObject(obj){
                let data = {};
                data.id = obj.id;
                data.title = obj.activityId;
                data.label = obj.characters;
                data.name = obj.id;
                data.description = obj.studentId;
                data.status = this.statusOp[obj.sportState];
                return data;
            },
        },
        mounted() {

        },
        created() {
            this.requestData();
        }
    }
</script>

<style>
  .activity-management{
    width: 100%;
  }

  ._self{
    position:fixed;
    width: 100% !important;
    bottom: 0;
    background-color: white;
    z-index: 2000;
  }

  .activity-management h1{
    font-weight: 300;
  }
  .activity-management .el-page-header__content {
    width: 100% !important;
  }

  .activity-management .warning-row {
    background: oldlace!important;
  }
  .activity-management .success-row{
    background-color:  #f0f9eb!important;
  }
  .activity-management .info-row{
    background-color:  rgb(192, 196, 204)!important;
  }



</style>
