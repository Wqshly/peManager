<template>
  <div id="container">
    <div class="table">
      <div class="table-header">
        <el-input type="text"
                  size="small"
                  v-model="search"
                  prefix-icon="el-icon-search"
                  style="width: 200px;display: inline-block"
                  placeholder="输入名字搜索">
        </el-input>
        <p class="a" @click.stop="handleMultiSignIn">批量签到</p>
        <p class="a" @click.stop="handleMultiSignOut">批量签退</p>
      </div>
      <el-table @selection-change="handleSelectionChange"
                :data="handleData()"
                style="width: 100%">
        <el-table-column type="selection"
                         fixed="left"
                         width="30">
        </el-table-column>
        <el-table-column prop='studentName'
                         width="75"
                         label="名字">
        </el-table-column>
        <el-table-column prop='flag'
                         label="状态">
          <template slot-scope="scope">
            <el-tag style="float: left;" :type="renderColor(scope.row.flag)">{{mappingStatus(scope.row)}}</el-tag>
            <div style="float: left;margin-left: 7px">{{calcTime(scope.row)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       :disabled="!(scope.row.flag === 0)"
                       @click.stop="handleSignIn(scope.$index, scope.row)">签到
            </el-button>

            <el-button size="mini"
                       :disabled="!(scope.row.flag === 1)"
                       @click.stop="handleSignOut(scope.$index, scope.row)">签退
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-size="pageSize"
                     layout="total, prev, pager, next, jumper, sizes"
                     :total="total">
      </el-pagination>
    </div>
    <div id="ex-right-container">
      <v-calendar class="rank" />
      <v-score class="score" />
    </div>
  </div>
</template>

<script>
  import vCalendar from "../../components/exerciseCalendar"
  import vScore from "../../components/myScore"
  export default {
    components: {
      vCalendar,
      vScore
    },
    data() {
      return {
        search: '',
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        multipleSelection: [],
      }
    },
    methods: {
      Sign(url, data) {
        this.$api.post_JSON(url, data).then(res => {
          if (res.code === 0) {
            this.requestTableData();
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      handleSignIn(index, row) {
        this.Sign('/api/SignIn/setSignInByClass', [row.id]);
      },
      handleMultiSignIn() {
        let data = [];
        for (let i in this.multipleSelection) {
          data.push(this.multipleSelection[i].id);
        }
        this.Sign('/api/SignIn/setSignInByClass', data);
      },
      handleSignOut(index, row) {
        this.Sign('/api/SignIn/setSignOutByClass', [row.id]);
      },
      handleMultiSignOut() {
        let data = [];
        for (let i in this.multipleSelection) {
          data.push(this.multipleSelection[i].id);
        }
        this.Sign('/api/SignIn/setSignOutByClass', data);
      },
      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      mappingStatus(row) {
        switch (row.flag) {
          case 0:
            return '未运动';
          case 1:
            return '正在运动';
          case 2:
            return '运动完成';
        }
      },
      renderColor(flag) {
        switch (flag) {
          case 0:
            return 'danger';
          case 1:
            return 'warning';
          case 2:
            return 'success';
        }
      },
      calcTime(row) {
        if (row.flag === 0) {
          return
        }
        let signTime, signOutTime;
        if (row.flag === 2) {
          signOutTime = row.singOutTime;
        }
        signTime = row.signTime;
        //let signTime = "2020-11-9T14:22:00.000+000";
        let new_date = signOutTime ? new Date(signOutTime.replace('T', ' ').split('.')[0]) : new Date(); //新建一个日期对象，默认现在的时间
        let old_date = new Date(signTime.replace('T', ' ').split('.')[0]); //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期
        let difftime = (new_date - old_date) / 1000; //计算时间差,并把毫秒转换成秒
        let days = parseInt(difftime / 86400); // 天  24*60*60*1000
        let hours = parseInt(difftime / 3600) - 24 * days;    // 小时 60*60 总小时数-过去的小时数=现在的小时数
        let minutes = parseInt(difftime % 3600 / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
        let seconds = parseInt(difftime % 60);  // 以60秒为一整份 取余 剩下秒数
        let n = "";
        if (days !== 0) {
          n += days + "天 ";
        }
        if (hours !== 0) {
          n += hours + "小时 ";
        }
        if (minutes !== 0) {
          n += minutes + "分钟";
        }
        if (days === 0 && hours === 0 && minutes === 0) {
          n = '不足一分钟'
        }
        return n;
      },
      handleData() {
        let temp_data = this.tableData.filter(data => this.filter(data));
        this.total = temp_data.length;
        return temp_data.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      },
      //搜索筛选
      filter(val) {
        return (!this.search || val.studentName.toLowerCase().includes(this.search.toLowerCase()));
      },
      //每页大小
      handleSizeChange(val) {
        this.pageSize = val;
      },

      handleCurrentChange(val) {
      },

      requestTableData() {
        let url = '/api/SignIn/getSignInByClass';
        this.$api.get(url).then(res => {
          if (res.code === 0) {
            this.tableData = this.$clone.transObjectToList(res.data);
          } else {
            this.$message.error(res.msg);
          }
        });
      },
    },
    mounted() {
      this.className = this.$store.state.user.unit;
    },
    created() {
      this.requestTableData();
    },
  }
</script>

<style scoped>
  #container {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .table {
    width: calc(100% - 600px);
    max-width: 1000px;
    min-width: 500px;
  }

  .score {
    padding-top: 20px;
  }

  #ex-right-container {
    width: 550px;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }

  p {
    padding: 8px 0;
    font-size: 15px;
    float: right;
  }

  .a {
    color: #409eff;
    cursor: pointer;
    padding-right: 20px;
  }

  @media screen and (max-width: 860px ) {
    #ex-right-container {
      width: 100%;
      justify-content: space-between;
    }

    .table {
      width: 100% ;
    }
    .score {
      padding-top: 0;
    }
  }
</style>
