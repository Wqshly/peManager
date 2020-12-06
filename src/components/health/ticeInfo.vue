<template>
  <div style="padding: 10px">
  <el-card shadow="hover" style="width: 100%;">
    <div class="card">
      <div class="info">
        <div v-for="(value, key) in data" style="display:flex;width: 200px;flex-wrap: nowrap;padding: 5px">
          <h3>{{mappingKey(key)}}：</h3>{{value}}
        </div>
      </div>

    </div>
  </el-card>
  </div>
</template>

<script>

  export default {
    props:{
      data: null
    },
    data() {
      return {
      }
    },
    methods: {
      mappingKey(key) {
        switch (key) {
          case '1':
            return "1000米跑";
          case '2':
            return "800米跑";
          case '3':
            return "引体向上";
          case '4':
            return "仰卧起坐";
          case '5':
            return "跳远";
          case '6':
            return "50米跑";
        }
      },
      handleData() {
        return 1;
      },

    },

  }
</script>

<style scoped>
  .card {
    padding-right: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .info {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }


</style>
