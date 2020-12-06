<template>
  <div id="my-score">
    <el-tabs type="border-card" style="width: 300px">
      <el-tab-pane label="你的分数">
        <p>{{myName+':'+myScore+'分'}}</p>
        <br>
        <p>一周内的运动记录:</p>
        <div class="student_score" style="width:300px;">
          <el-table
            :data="handleData()"
            max-height="300"> >
            <el-table-column
              prop="startTime"
              label="日期"
              width="100"
              class="cell"
              :formatter="mappingStartTime">
            </el-table-column>
            <el-table-column
              prop="score"
              label="分数"
              width="50">
            </el-table-column>
            <el-table-column
              prop="timeLen"
              label="运动时长/(分钟)"
              width="150">
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
        myName: null,
        myScore: 0,
        sportRecord: [],
      }
    },
    methods: {
      mappingStartTime(row, column) {
        return row.startTime.split(".")[0].replace('T', '\n');
      },
      requestScore(url, index) {
        this.$api.get(url).then(res => {
          if (res.code === 0) {
            switch (index) {
              case 1:
                this.myName = res.data.name;
                this.myScore = res.data.score;
                break;
              case 2:
                this.sportRecord = res.data;
                break;
              default:
                break;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      handleData() {
        return this.sportRecord;
      },
    },
    mounted() {
      this.requestScore('/api/semester/singleScore', 1);
      this.requestScore('/api/SignIn/searchActivityOneWeek', 2);
    },
    created() {

    },
  }
</script>

<style scoped>

</style>
