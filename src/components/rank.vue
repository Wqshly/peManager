<template>
  <div>
    <el-tabs type="border-card" style="width: 400px">
      <el-tab-pane label="班内排行 ">
        <div class="student_score" style="width:400px;">
          <el-table
            :data="handleData1()"
            max-height="300"> >
            <el-table-column
              type="index"
              width="30">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="80">
            </el-table-column>
            <el-table-column
              prop="collegeId"
              label="学院"
              width="200">
            </el-table-column>
            <el-table-column
              prop="score"
              label="PE分"
              width="90">
            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>
      <el-tab-pane label="校内排行 ">
        <div class="student_score" style="width:400px;">
          <el-table
            :data="handleData2()"
            max-height="300"> >
            <el-table-column
              type="index"
              width="30">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="80">
            </el-table-column>
            <el-table-column
              prop="collegeId"
              label="学院"
              width="200">
            </el-table-column>
            <el-table-column
              prop="score"
              label="PE分"
              width="90">
            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        score1: [],
        score2: [],
      }
    },
    methods: {
      requestScore(url, index) {
        this.$api.get(url).then(res => {
          if (res.code === 0) {
            switch (index) {
              case 1:
                this.score1 = res.data;
                break;
              case 2:
                this.score2 = res.data;
                break;
              default:
                break;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      handleData1() {
        return this.score1;
      },
      handleData2() {
        return this.score2;
      },
    },
    mounted() {

    },
    created() {
      this.myName = this.$store.state.user.username;
      this.requestScore('/api/semester/scoreByClass', 1);
      this.requestScore('/api/semester/scoreBySchool', 2);
    },
  }
</script>

<style scoped>
</style>
