<template>
  <div style="padding: 10px">
  <el-card shadow="hover" style="width: 100%;">
    <div class="card">
      <div class="info">
        <div v-for="(value, key) in data" style="display:flex;width: 200px;flex-wrap: nowrap;padding: 5px">
          <h3>{{mappingKey(key)}}：</h3>{{value}}
        </div>
      </div>

      <div class="avatar">
        <div style="width: 174px;height: 207px;border-bottom: 1px solid #cccccc;">
          <img class="image" alt=""/>
        </div>
        <div style="position:absolute;bottom: 14px;left: 14px">
          <label for="file" class='upload'><i class="el-icon-edit">更换头像</i></label>
          <input id="file" type="file" class="change" @change="insert(this)" accept="image/*"/>
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
          case 'name':
            return "姓名";
          case 'school':
            return "学校";
          case 'college':
            return "学院";
          case 'classz':
            return "班级";
          case 'number':
            return "学号"
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

  .avatar {
    position: relative;
    border: 1px solid #ddd;
    padding-bottom: 40px;
  }

  .change {
    z-index: -11111;
    width: 0px;
    height: 1px;
  }

  .upload {
    text-decoration: none;
    color: #409EFF;
    cursor: pointer;
  }

</style>
