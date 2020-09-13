<template>
  <div  class="main-nav">
    <div class="content">

      <el-button
        style="float:right;"
        size="middle"
        type="success"
        @click="handleNew()"
        v-if="current_choose[2]!==0">新增成员</el-button>
      <br>
      <el-button
        style="float:right;"
        size="middle"
        type="success"
        @click="handleNew()"
        >新增学生</el-button>
      <el-button type="text" @click="handleDeleteSome()">删除选中项</el-button>
      <div style="display: inline-block;float:right;margin-right: 50px">
        <a href="javascript:" class="upload" >批量导入
          <input id= "file" type="file"  class="change"  @change="insert(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        </a>
        <el-button type="text" @click="export1()">下载模板表格</el-button>
        <el-button type="text" @click="export2Excel2()">下载当前班级数据</el-button>
      </div>

      <template>
        <el-table
          @selection-change="handleSelectionChange"
          :data="handleData()"
          style="width: 100%">
          <el-table-column
            type="selection"
            fixed="left"
            width="55">
          </el-table-column>
          <el-table-column
            prop='studentName'
            label="名字">
            <template slot="header" >
              <label>
                <input
                  type="text"
                  v-model="search"
                  prefix-icon="el-icon-search"
                  style="width: 150px;"
                  placeholder="输入关键字搜索"
                />
              </label>
            </template>
          </el-table-column>
          <el-table-column
            prop='studentNumber'
            label="学号">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

      <el-dialog title="数据预览" width="fit-content" :visible.sync="dialogTableVisible">
        <el-table :data="arr_temp.slice((currentPage_temp-1)*pageSize,currentPage_temp*pageSize_temp)" >
          <el-table-column property="studentName" label="姓名" width="200"></el-table-column>
          <el-table-column property="studentNumber" label="学号" width="200"></el-table-column>
        </el-table>
        <el-pagination

          @size-change="handleSizeChangeTemp"
          @current-change="handleCurrentChangeTemp"
          :current-page.sync="currentPage_temp"
          :page-size="pageSize_temp"
          layout="total, prev, pager, next, jumper, sizes"
          :total="total_temp">
        </el-pagination>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm_import()">确 定</el-button>
      </el-dialog>

      <el-dialog title="编辑" width="fit-content" :visible.sync="dialogEditVisible">
        <div v-for="item in editDia">
          {{item.key}}:
          <el-input
            v-model="item.value"
            :disabled="!item.flag1">
          </el-input>
          <br>
        </div>
        <br>
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm_edit()">确 定</el-button>
      </el-dialog>

      <el-dialog title="新增同学" width="fit-content" :visible.sync="dialogEditVisible2">
        姓名：
        <el-input v-model="form_new.studentName">        </el-input>
        学号:
        <el-input v-model="form_new.studentNumber">        </el-input>
        <br>
        <el-button @click="dialogEditTableVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirm_new()">确 定</el-button>
      </el-dialog>

    </div>
  </div>
</template>

<script>

    import {api} from "@/api/ajax"
    import {clone} from "@/api/clone.js"

    export default {
  //活动中心的父级组件
  name: 'mana_class',
    data() {
        return {
            search: '',
            tableProp:'',
            dialogEditVisible:false,
            dialogEditVisible2:false,
            multipleSelection:[],
            /*数据预览*/
            dialogTableVisible:false,
            arr_temp_filename:'',
            arr_temp: [{
                studentName: '',
                studentNumber: '',
            }, ],
            currentPage_temp:1,
            pageSize_temp:10,
            total_temp: 0,

            /*当前学校id 院系id 班级id*/
            current_choose:[0,0,0],

            currentPage: 1,
            pageSize: 10,
            total:0,
            tableData_Download: [{
                studentName: '',
                studentNumber: '',
            }, ],
            tableData: [],
            editDia:[],
            editUpload:{},
            form_new:{
              studentName:"",
              studentNumber:0,
            },
        }
    },
    methods: {
        //多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /*批量按钮*/
        handleDeleteSome(){

            this.$confirm('确定删除？?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = [];
                for(let i in this.multipleSelection){
                    data.push(this.multipleSelection[i].id);
                }

                this.delete(data);

            }).catch(() => {

            });
        },
        delete(data){
            let url = '/api/user/deleteUser';
            api.post_JSON(url,data).then(res => {
                let _this = this;
                if (res.code === 0) {
                    _this.$message({
                        message: '成功!',
                        type: 'success'
                    });
                    _this.reloadTable();
                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        //每页条数
        handleSizeChangeTemp(val) {
            this.pageSize_temp=val;

        },
        //当前页数
        handleCurrentChangeTemp(val) {

        },

        //导入表格 显示到展示区
        insert(obj){
            var a = document.getElementById('file');
            this.arr_temp_filename = a.value;
            this.importf(obj);
            this.dialogTableVisible=true;
        },
        uploadAPI(){
            console.log(document.getElementById('file').files[0]);
            let data = new FormData();
            data.append('sId',this.$route.query.sid);
            data.append('cId',this.$route.query.cid);
            data.append('ccId',this.$route.query.ccid);
            data.append('excelFile',document.getElementById('file').files[0]);
            console.log(data);
            api.upload('/api/importFile/readExcel',data).then(res => {
                let _this = this;
                if (res.code === 0) {
                    _this.$message({
                        message: '成功!',
                        type: 'success'
                    });
                    _this.reloadTable();
                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            });
            this.dialogTableVisible=false;
        },
        //导入表格确认
        confirm_import(){
            this.$confirm('将上传至服务器 ，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.uploadAPI();
                this.dialogTableVisible=false;

            }).catch(() => {
                this.dialogTableVisible=false;
            });
        },
        //新增确认
        confirm_new(){
            this.dialogEditVisible2 = false;
            let url = "/api/student/addStudent";
            let data =  {
                shcoolId:this.$route.query.sid,
                collegeId:this.$route.query.cid,
                classesId:this.$route.query.ccid,
                studentName:this.form_new.studentName,
                studentNumber:this.form_new.studentNumber
            };
            api.post_JSON(url,data).then(res => {
                let _this = this;
                if (res.code === 0) {
                    _this.$message({
                        message: '成功!',
                        type: 'success'
                    });
                    _this.reloadTable();
                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        //编辑确认
        confirm_edit(){
            this.dialogEditVisible = false;
            for(let i in this.editDia){
                this.editUpload[this.editDia[i].key] = this.editDia[i].value;
            }
            let url = '/api/student/updateStudent';
            api.post_JSON(url,this.editUpload).then(res => {

                let _this = this;
                if (res.code === 0) {
                    _this.$message({
                        message: '成功',
                        type: 'success'
                    });

                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        //excel导出API
        importf(obj) {
            let _this = this;
            let inputDOM = this.$refs.inputer;   // 通过DOM取文件数据

            this.file = event.currentTarget.files[0];
            var rABS = false; //是否将文件读取为二进制字符串
            var f = this.file;
            var reader = new FileReader();
            //if (!FileReader.prototype.readAsBinaryString) {
            FileReader.prototype.readAsBinaryString = function(f) {
                var binary = "";
                var rABS = false; //是否将文件读取为二进制字符串
                var pt = this;
                var wb; //读取完成的数据
                var outdata;
                var reader = new FileReader();
                reader.onload = function(e) {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for(var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    var XLSX = require('xlsx');
                    if(rABS) {
                        wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = XLSX.read(binary, {
                            type: 'binary'
                        });
                    }
                    // outdata就是你想要的东西 excel导入的数据
                    outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                    // excel 数据再处理
                    _this.arr_temp = [];

                    outdata.map(v => {
                        let obj = {};
                        obj.studentName = v.姓名;
                        obj.studentNumber = v.学号;
                        _this.arr_temp.push(obj);
                    });
                    _this.total_temp = _this.arr_temp.length;
                };
                reader.readAsArrayBuffer(f);
            };
            if(rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }


        },

        //导出表格
        export1(){
            this.$confirm('将下载模板表格, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.export2Excel();
            }).catch(() => {

            });
        },
        //excel导出API非模板
        export2Excel2() {
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../vendor/Export2Excel');
                const tHeader = ['姓名', '学号']; //对应表格输出的title
                const filterVal = ['studentName', 'studentNumber']; // 对应表格输出的数据
                const list = this.tableData;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '班级信息'); //对应下载文件的名字
            })
        },
        //excel导出API模板
        export2Excel() {
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../vendor/Export2Excel');
                const tHeader = ['姓名', '学号']; //对应表格输出的title
                const filterVal = ['studentName', 'studentNumber']; // 对应表格输出的数据
                const list = this.tableData_Download;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '模板'); //对应下载文件的名字
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        //导出表格结束

        reloadTable(){
            this.requestStudentList(this.$route.query.sid,this.$route.query.cid,this.$route.query.ccid);
        },
        handleNew() {
            this.dialogEditVisible2 = true;
        },

        /*表格的操作*/
        handleClick(index, row) {

        },

        handleEdit(index, row) {
            this.editDia = [];
            this.editUpload = row;
            let flag = true;
            for(let i in row){
                flag = true;
                if(i.toLowerCase().includes("id")){
                    flag = false;
                }
                let temp = {
                    key:i,
                    value:row[i],
                    flag1:flag
                };
                this.editDia.push(temp);
            }
            this.dialogEditVisible = true;
        },

        handleDelete(index, row) {
            this.$confirm('确定删除？?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                this.$message({
                    type: 'success',
                    message: '成功!'
                });
                this.reloadTable();
            }).catch(() => {

            });

        },

        //处理显示数据
        handleData(){
            let temp_data = this.tableData.filter(data=>this.filter(data));
            this.total=temp_data.length;
            return temp_data.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        },

        //搜索筛选
        filter(val){
            return (!this.search || val.studentName.toLowerCase().includes(this.search.toLowerCase()) || val.studentNumber.toLowerCase().includes(this.search.toLowerCase()));
        },
        //每页大小
        handleSizeChange(val) {
            this.pageSize=val;

        },

        //当前页数
        handleCurrentChange(val) {

        },

        requestStudentList(sid,cid,ccid){
            const url = '/api/student/queryStudentInfoByClass/'+sid+'/'+cid+'/'+ccid;
            api.get(url).then(res => {
                let _this = this;
                if (res.code === 0) {
                    this.tableData=[];
                    if(res.data != null){
                        if(res.data.length === undefined){
                            this.tableData.push(res.data);
                        }else{
                            for(let i = 0;i < res.data.length; ++i){
                                this.tableData.push(res.data[i]);
                            }
                        }
                    }

                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },

    },
    mounted() {

    },
    created() {
        this.reloadTable();
    },
}
</script>

<style scoped>
  .main-nav .content{
    padding: 0;
    margin: 20px auto;
    overflow: hidden;

  }
  .main-nav .crumb{
    cursor: pointer;
    transition: all 0.3s;
    display: inline-block;
    margin-right: 10px;
  }
  .main-nav  .crumb:hover {
    color: #409EFF !important;
  }
  .active {
    color: #409EFF !important;
  }

  .main-nav .upload{
    padding: 4px 10px;
    font-size: 14px;
    height: 100%;
    line-height: 100%;
    position: relative;
    text-decoration: none;
    color: #409EFF;
    cursor: pointer;

  }

  .main-nav .change{
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
</style>
