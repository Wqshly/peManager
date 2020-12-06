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
          case 'height':
            return "身高";
          case 'weight':
            return "体重";
          case 'shili':
            return "视力";
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
