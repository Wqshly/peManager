<template>
  <div class="checkin_management1">
    <h1>{{check_title}}</h1>
    <div class="checkin_management1_content">

      <div style="display: inline-block;float:left;">
        <el-radio-group v-model="filter_status">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="未签到"></el-radio-button>
          <el-radio-button label="已签到"></el-radio-button>
          <el-radio-button label="已签退"></el-radio-button>
        </el-radio-group>
      </div>

      <div style="display: inline-block;float:right;margin-right: 50px">
        <a href="javascript:" class="upload"  v-show="title">导入成员
          <input id= "file" type="file"  class="change"  @change="insert(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        </a>
        <el-button type="text" @click="export1()">数据导出</el-button>
        <el-button type="text" @click="groupSignIn()" :disabled="valid">批量签到</el-button>
        <el-button type="text" @click="groupSignOut()" :disabled="valid">批量签退</el-button>
      </div>

      <div style="width: 150px;margin: 25px 0;display: block; ">
          <el-input
            type="text"
            v-model="search"
            prefix-icon="el-icon-search"
            placeholder="输入关键字搜索"
          >
          </el-input>
      </div>

      <template>
        <el-table
          @cell-click="handleClick"
          @selection-change="handleSelectionChange"
          :data="handleData()"
          border
          :row-class-name="tableRowClassName"
          style="width: 100%">

          <el-table-column
            type="selection"
            fixed="left"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            fixed="left"
            label="姓名"
            width="80">
          </el-table-column>

          <el-table-column
            prop="userNumber"
            label="学号"
            width="150">
          </el-table-column>

          <el-table-column
            prop="status"
            label="状态"
            width="120">
            <template #header>
              <el-popover trigger="hover" placement="top">
                状态变化：未签到---><span style="background-color: oldlace!important;"> 已签到 </span>---><span style="background-color: #f0f9eb!important;"> 已签退 </span>
                <div slot="reference" class="name-wrapper">
                  状态
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
              <el-button :disabled="!(scope.row.status==='未签到')" @click="handleSignIn(scope.$index,scope.row)"  size="small">签到</el-button>
              <el-button :disabled="!(scope.row.status==='已签到')" size="small" @click="handleSignOut(scope.$index, scope.row)">签退</el-button>
            </template>
          </el-table-column>
        </el-table>
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

  </div>
</template>

<script>
    import {api}  from '@/api/ajax'
    export default {
        inject:["reload"],
        data () {
            return {
                signIdList:[],
                valid:true,
                dialogTableVisible:false,
                notifyPromise:Promise.resolve(),
                multipleSelection: [],
                search:'',
                filter_status:'全部',
                signOp:['未签到','已签到','已签退'],
                check_title:'请先在活动管理中选择一个活动进行组织签到',
                currentPage: 1,
                pageSize: 10,
                total:0,
                tableData: [{
                    userNumber: '',
                    name: '',
                    status:'',
                }, ],
                tableData_copy: [{
                    userNumber: '20160502',
                    name: '王小虎',
                    status:'未签到',
                }, {
                    userNumber: '20160504',
                    name: '王小虎',
                    status:'已签到',
                }, {
                    userNumber: '20160501',
                    name: '王小虎',
                    status:'已签退',
                }, {
                    userNumber: '20160503',
                    name: '王小虎',
                    status:'已签到',
                }],
          };
        },
        methods: {

            //过滤数据
            handleData(){
                let temp_data = this.tableData.filter(data=>this.filter(data));
                this.total=temp_data.length;
                return temp_data.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
            },

            //搜索筛选&&状态筛选
            filter(val){
                return (val.name)&&(!this.search || val.name.toLowerCase().includes(this.search.toLowerCase())) &&( val.status === this.filter_status ||this.filter_status==='全部');
            },

            //导出表格
            export1(){
                let filename = '';
                if(this.title===''){
                    filename='数据为空，将下载模板表格';
                }
                else {
                    filename = '将下载文件 '+this.check_title+'签到信息.xlsx';
                }
                this.$confirm(filename+', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.export2Excel();
                    this.$message({
                        type: 'success',
                        message: '成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },

            //excel导出API
            export2Excel() {
                require.ensure([], () => {
                    const { export_json_to_excel } = require('../../vendor/Export2Excel');
                    const tHeader = ['姓名', '学号', '状态']; //对应表格输出的title
                    const filterVal = ['name', 'userNumber', 'status']; // 对应表格输出的数据
                    const list = this.tableData;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, this.check_title+'签到信息'); //对应下载文件的名字
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            //导出表格结束

            //深度克隆 避免改变被赋值对象影响赋值对象
            deepClone(obj){
                let newObj=Array.isArray(obj)?[]:{};

                if(obj&&typeof obj ==="object"){
                    for(let key in obj){
                        if(obj.hasOwnProperty(key)){
                            newObj[key]=(obj && typeof obj[key]==='object')?this.deepClone(obj[key]):obj[key];
                        }
                    }
                }
                return newObj
            },

            //表格点击事件
            handleClick(row) {
                console.log(row);

            },

            notify(msg) {
                this.notifyPromise = this.notifyPromise.then(this.$nextTick).then(()=>{
                    this.$notify({
                        title: msg,
                    });
                })
            },

            requestSignOut(data){
                let url = '/api/SignIn/updateSignOutList';
                api.post_JSON(url,data).then(res => {
                    if (res.code === 0){
                        for(var i = 0; i < this.tableData.length; i++){
                            if(-1!==data.indexOf(this.tableData[i].signId)){
                                if(this.tableData[i].status==='已签到'){
                                    this.tableData[i].status='已签退';
                                    this.notify(this.tableData[i].userNumber+'签退成功');
                                }
                            }
                        }
                    }
                })
            },
            requestSignIn(data){
                let url = '/api/SignIn/updateSignInList';
                api.post_JSON(url,data).then(res => {
                    if (res.code === 0){
                        for(var i = 0; i < this.tableData.length; i++){
                            if(-1!==data.indexOf(this.tableData[i].signId)){
                                if(this.tableData[i].status==='未签到'){
                                    this.tableData[i].status='已签到';
                                    this.notify(this.tableData[i].userNumber+'签到成功');
                                }
                            }
                        }
                    }
                })
            },

            //签到
            handleSignIn(index,row){
                let data = [];
                data.push(row.signId);
                this.requestSignIn(data);
            },
            //签退
            handleSignOut(index,row){
                let data = [];
                data.push(row.signId);
                this.requestSignOut(data);
            },
            //批量
            groupSignIn(){
                let data = [];
                for(var j=0;j < this.multipleSelection.length;j++){
                    data.push(this.multipleSelection[j].signId);
                }
                this.requestSignIn(data);
            },
            groupSignOut(){
                let data = [];
                for(var j=0;j < this.multipleSelection.length;j++){
                    data.push(this.multipleSelection[j].signId);
                }
                this.requestSignOut(data);
            },
            //每页条数
            handleSizeChange(val) {
                this.pageSize=val;
            },

            //当前页数
            handleCurrentChange(val) {
            },
            //渲染单行颜色
            tableRowClassName({row, rowIndex}) {
                if(row.status==='已签退')
                    return 'success-row';
                if(row.status==='已签到')
                    return  'warning-row';
                return ''
            },

            //多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            requestPartner(){
                let url = '/api/activity/getPartner/'+this.$store.state.activityId;
                api.get(url).then(res => {
                    if (res.code === 0){
                        if(res.data != []){
                            this.tableData = [];
                            //因为是一个数据所以不是list，没有长度
                            if(res.data.length === undefined){
                                this.check_title = res.data.activityId;
                                this.tableData.push(this.mappingObject(res.data));
                            }else{
                                this.check_title = res.data[0].activityId;
                                for(let i = 0;i < res.data.length; ++i){
                                    this.tableData.push(this.mappingObject(res.data[i]));
                                }
                            }
                        }
                        else{
                            this.check_title = '该活动暂无参与人员';
                        }
                        this.total=this.tableData.length;
                    }
                })
            },
            mappingObject(obj){
                let data = {};
                data.name = obj.studentId;
                data.userNumber = obj.studentNumber;
                data.status = this.signOp[obj.signStatus];
                data.signId = obj.signId;
                return data;
            },
        },
        created() {
            if(this.$store.state.activityId!==0){
                this.valid=false;
                this.requestPartner();
            }
        }
    }
</script>

<style>
  .checkin_management1{
    margin-top: 20px;
  }

  .checkin_management1  ._self{
    position:fixed;
    width: 100%;
    bottom: 0;
    background-color: white;
    z-index: 2000;
  }

  .checkin_management1 .checkin_management1_userNumber{
    font-size: 15px;
    font-weight: 300;
    padding-bottom: 20px;
    border-bottom:1px solid #ebebeb;
  }
  .checkin_management1 .checkin_management1_content{
    margin-top: 20px;
  }
  .checkin_management1 h1{
    font-weight: 300;
  }

  .checkin_management1 .warning-row {
    background: oldlace!important;
  }
  .checkin_management1 .success-row{
    background-color:  #f0f9eb!important;
  }
  .checkin_management1 .upload{
    padding: 4px 10px;
    font-size: 14px;
    height: 100%;
    line-height: 100%;
    position: relative;
    text-decoration: none;
    color: #409EFF;
    cursor: pointer;

  }

  .checkin_management1 .change{
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }


</style>
