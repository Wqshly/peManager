<template>
  <div class="main-nav">
    <div v-if="!editClass" class="content">

      <template>
        <div class="crumb" v-for="(crumb,i) in crumbs" @click="crumbsClick(crumb.value)"
             :class="{ 'active': i+1 === crumb_flag }">
          {{crumb.title}}
          <div v-if="i!==2" style="display:inline-block;">&gt;</div>
        </div>
      </template>
      <br>

      <el-button
        style="float:right;"
        size="middle"
        type="success"
        @click="handleNew()"
        v-if="current_choose[crumb_flag-2]!==0">新建一个{{this.crumbs[this.crumb_flag-1].title}}
      </el-button>
      <br>
      <el-button type="text" @click="handleDeleteSome()">删除选中项</el-button>
      <div style="display: inline-block;float:right;margin-right: 50px">
        <a href="javascript:" class="upload">批量导入
          <input id="file1" type="file" class="change" @change="insert(this)"
                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        </a>
        <el-button type="text" @click="export1()">下载模板表格</el-button>

      </div>

      <template>
        <el-table
          @selection-change="handleSelectionChange"
          @cell-click="handleClick"
          :data="handleData()"
          style="width: 100%">
          <el-table-column
            type="selection"
            fixed="left"
            width="55">
          </el-table-column>
          <el-table-column
            :prop=tableProp
            label="名字">
            <template #header>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click.stop="handleEdit(scope.$index, scope.row)">编辑
              </el-button>

              <el-button
                size="mini"
                type="danger"
                @click.stop="handleDelete(scope.$index, scope.row)">删除
              </el-button>
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
        <el-table :data="arr_temp.slice((currentPage_temp-1)*pageSize,currentPage_temp*pageSize_temp)">
          <el-table-column property="school" label="学校" width="200"></el-table-column>
          <el-table-column property="college" label="院系" width="200"></el-table-column>
          <el-table-column property="class" label="班级" width="200"></el-table-column>
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
          {{mappingKey(item.key)}}:
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

    </div>
    <mana-class :choose="current_choose"
                :reload="reload"
                @back="editClass = false"
                v-else/>
  </div>
</template>

<script>

  import manaClass from "./manaClass";

  export default {
    components: {
      manaClass
    },
    data() {
      return {
        reload: 0,
        editClass: false,
        search: '',
        tableProp: '',
        dialogEditVisible: false,
        multipleSelection: [],

        /*数据预览*/
        dialogTableVisible: false,
        arr_temp_filename: '',
        arr_temp: [{
          school: '',
          college: '',
          class: ''
        },],
        currentPage_temp: 1,
        pageSize_temp: 10,
        total_temp: 0,
        /*当前学校id 院系id 班级id*/
        current_choose: [0, 0, 0],

        currentPage: 1,
        pageSize: 10,
        total: 0,
        crumb_flag: 1,
        tableData_Download: [{
          school: '',
          college: '',
          class: ''
        },],
        tableData: {
          data_school: [],
          data_college: [],
          data_class: [],
        },

        crumbs: [
          {
            value: 1,
            title: '学校',
            tableName: 'data_school',
            prop: 'schoolName'
          },
          {
            value: 2,
            title: '院系',
            tableName: 'data_college',
            prop: 'collegeName'
          },
          {
            value: 3,
            title: '班级',
            tableName: 'data_class',
            prop: 'className'
          },
        ],
        editDia: [],
        editUpload: {},

      }
    },
    methods: {

      //每页条数
      handleSizeChangeTemp(val) {
        this.pageSize_temp = val;

      },
      //当前页数
      handleCurrentChangeTemp(val) {

      },

      //导入表格 显示到展示区
      insert(obj) {
        var a = document.getElementById('file1');
        this.arr_temp_filename = a.value;

        this.importf(obj);
        this.dialogTableVisible = true;
      },
      uploadFile() {
        let data = {};

      },
      uploadAPI() {
        console.log(document.getElementById('file1').files[0]);
        let data = new FormData();
        data.append('excelFile', document.getElementById('file1').files[0]);
        console.log(data);
        this.$api.upload('/api/importFile/ImportFileClass', data).then(res => {
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
        this.dialogTableVisible = false;
      },
      //导入表格确认
      confirm_import() {
        this.$confirm('将上传至服务器 ，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ///此处将修改数据库
          this.uploadAPI();

          this.dialogTableVisible = false;
        }).catch(() => {

        });
      },
      updata(url) {
        this.$api.post_JSON(url, this.editUpload).then(res => {

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

      //编辑确认
      confirm_edit() {
        this.dialogEditVisible = false;
        let url = '';
        for (let i in this.editDia) {
          this.editUpload[this.editDia[i].key] = this.editDia[i].value;
        }
        if (this.crumb_flag === 1) {
          url = "/api/school/updateSchool"
        } else if (this.crumb_flag === 2) {
          url = "/api/college/updateCollege"
        } else if (this.crumb_flag === 3) {
          url = "/api/classes/updateClasses"
        }
        this.updata(url);
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
        FileReader.prototype.readAsBinaryString = function (f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require('xlsx');
            if (rABS) {
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
              obj.school = v.学校;
              obj.college = v.院系;
              obj.class = v.班级;
              _this.arr_temp.push(obj);
            });
            _this.total_temp = _this.arr_temp.length;


          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }


      },
      //导出表格
      export1() {
        this.export2Excel();
      },
      //excel导出API
      export2Excel() {
        require.ensure([], () => {
          const {export_json_to_excel} = require('../../vendor/Export2Excel');
          const tHeader = ['学校', '院系', '班级']; //对应表格输出的title
          const filterVal = ['school', 'college', 'class']; // 对应表格输出的数据
          const list = this.tableData_Download;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '模板'); //对应下载文件的名字
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //导出表格结束

      uploadClass(className, schoolId, collegeId) {
        let url = "/api/classes/addClasses";
        let data = {
          schoolId: schoolId,
          collegeId: collegeId,
          className: className
        };
        this.$api.post_JSON(url, data).then(res => {

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
      reloadTable() {
        if (this.crumb_flag === 1) {
          this.requestSchoolList();
        } else if (this.crumb_flag === 2) {
          this.requestCollegeList(this.current_choose[0]);
        } else if (this.crumb_flag === 3) {
          this.requestClassList(this.current_choose[0], this.current_choose[1]);
        }
      },
      uploadSchool(schoolName) {
        let url = "/api/school/addSchool";
        let data = {
          schoolName: schoolName,
          schoolAddress: "未设置",
          phone: "未设置",
          schoolZipCode: "未设置",
          schoolIntroduction: "未设置"
        };
        this.$api.post_JSON(url, data).then(res => {

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
      uploadCollege(collegeName, schoolId) {
        let url = "/api/college/addCollege";
        let data = {
          shcoolId: schoolId,
          collegeName: collegeName,
          score: 0,
          collegeInfo: "未设置"
        };

        this.$api.post_JSON(url, data).then(res => {
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

      handleNew() {
        if (this.crumb_flag === 1) {
          this.$prompt('请输入学校名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({value}) => {
            this.uploadSchool(value);
          }).catch(() => {

          });
        } else if (this.crumb_flag === 2) {
          this.$prompt('请输入院系名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({value}) => {
            this.uploadCollege(value, this.current_choose[0]);
          }).catch(() => {

          });
        } else {
          this.$prompt('请输入班级名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({value}) => {
            this.uploadClass(value, this.current_choose[0], this.current_choose[1]);
          }).catch(() => {

          });
        }
      },
      /*表格的操作*/
      handleClick(row) {
        if (this.crumb_flag === 1) {
          this.requestCollegeList(row.id);
          this.current_choose[0] = row.id;
        } else if (this.crumb_flag === 2) {
          this.requestClassList(this.current_choose[0], row.id);
          this.current_choose[1] = row.id;
        } else if (this.crumb_flag === 3) {
          this.current_choose[2] = row.id;
          this.editClass = true;
          this.reload++;
        }
      },
      mappingKey(key) {
        switch (key) {
          case 'schoolName':
            return '学校名字';
          case 'schoolAddress':
            return '学校地址';
          case 'phone':
            return '联系电话';
          case 'schoolZipCode':
            return '邮编';
          case 'schoolIntroduction':
            return '学校简介';
          case 'collegeName':
            return '院系名称';
          case 'collegeInfo':
            return '院系简介';
          case 'className':
            return '班级名称';
          default:
            return key;
        }

      },
      handleEdit(index, row) {
        this.editDia = [];
        this.editUpload = row;
        let flag = true;
        for (let i in row) {
          flag = true;
          if (i.toLowerCase().includes("id")) {
            flag = false;
          }
          let temp = {
            key: i,
            value: row[i],
            flag1: flag
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
          let data = [];
          data.push(row.id);
          this.delete(data);
        }).catch(() => {

        });
      },
      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      /*批量按钮*/
      handleDeleteSome() {
        this.$confirm('确定删除？?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = [];
          for (let i in this.multipleSelection) {
            data.push(this.multipleSelection[i].id);
          }
          this.delete(data);

        }).catch(() => {

        });
      },
      delete(data) {
        let url = '';
        if (this.crumb_flag === 1) {
          url = '/api/school/deleteSchool'
        } else if (this.crumb_flag === 2) {
          url = '/api/college/deleteCollege'
        } else if (this.crumb_flag === 3) {
          url = '/api/classes/deleteClasses'
        }
        this.$api.post_JSON(url, data).then(res => {
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
      /*切换表格数据*/
      shift_data(val) {
        /*this.crumb_flag用来监视当前表格数据到底是什么*/
        this.tableProp = this.crumbs[val - 1].prop;
        this.crumb_flag = val;
      },
      crumbsClick(val) {
        this.shift_data(val);
      },

      //处理显示数据
      handleData() {
        let temp_data = this.tableData[this.crumbs[this.crumb_flag - 1].tableName];
        let temp_data2 = temp_data.filter(data => this.filter(data));
        this.total = temp_data2.length;
        return temp_data2.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      },

      //搜索筛选
      filter(val) {
        return (!this.search || val[this.tableProp].toLowerCase().includes(this.search.toLowerCase()));
      },
      //每页大小
      handleSizeChange(val) {
        this.pageSize = val;

      },

      //当前页数
      handleCurrentChange(val) {

      },

      requestClassList(sid, cid) {
        const url = '/api/classes/queryClassesList/' + sid + '/' + cid;
        this.$api.get(url).then(res => {
          let _this = this;
          if (res.code === 0) {

            this.tableData.data_class = [];
            if (res.data != null) {
              if (res.data.length === undefined) {
                this.tableData.data_class.push(res.data);
              } else {
                for (let i = 0; i < res.data.length; ++i) {
                  this.tableData.data_class.push(res.data[i]);
                }
              }
            }
            this.shift_data(3);

          } else {
            _this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },

      requestCollegeList(id) {
        const url = '/api/college/queryCollegeList/' + id;
        this.$api.get(url).then(res => {
          let _this = this;
          if (res.code === 0) {
            this.tableData.data_college = [];
            if (res.data != null) {
              if (res.data.length === undefined) {
                this.tableData.data_college.push(res.data);
              } else {
                for (let i = 0; i < res.data.length; ++i) {
                  this.tableData.data_college.push(res.data[i]);
                }
              }
            }

            this.shift_data(2);

          } else {
            _this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },

      requestSchoolList() {
        const url = '/api/school/querySchoolList';
        this.$api.get(url).then(res => {
          let _this = this;
          if (res.code === 0) {

            this.tableData.data_school = [];
            if (res.data != null) {
              if (res.data.length === undefined) {
                this.tableData.data_school.push(res.data);
              } else {
                for (let i = 0; i < res.data.length; ++i) {
                  this.tableData.data_school.push(res.data[i]);
                }
              }
            }
            this.shift_data(1);

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
      this.requestSchoolList();
    },
  }
</script>

<style scoped>
  .main-nav {
    margin: 0 auto;
    max-width: 1140px;
    width: 100%;
  }

  .main-nav .content {
    padding: 0;
    margin: 20px auto;
    overflow: hidden;

  }

  .main-nav .crumb {
    cursor: pointer;
    transition: all 0.3s;
    display: inline-block;
    margin-right: 10px;
  }

  .main-nav .crumb:hover {
    color: #409EFF !important;
  }

  .active {
    color: #409EFF !important;
  }

  .main-nav .upload {
    padding: 4px 10px;
    font-size: 14px;
    height: 100%;
    line-height: 100%;
    position: relative;
    text-decoration: none;
    color: #409EFF;
    cursor: pointer;

  }

  .main-nav .change {
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
</style>
