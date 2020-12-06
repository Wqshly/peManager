<template>
  <div id="venue_sub_add_container">
    <el-form :model="ruleForm" label-width="120px" class="demo-form">
      <el-form-item class="form-row">
        <h3>编辑运动馆</h3>
      </el-form-item>
      <el-form-item label="场馆" class="form-row">
        {{venueId}}
      </el-form-item>

      <el-form-item label="运动馆名" class="form-row">
        <el-input
          placeholder="运动馆名"
          v-model="ruleForm.title">
        </el-input>
      </el-form-item>

      <el-form-item label="场地规模" class="form-row">
        <el-input
          placeholder="场地规模"
          v-model="ruleForm.title1">
        </el-input>
      </el-form-item>

      <el-form-item label="场地编号" class="form-row">
        <el-input
          style="width:50%"
          placeholder="场地编号"
          v-model="ruleForm.title2">
        </el-input>
        <el-input-number placeholder="场地编号" v-model="ruleForm.num" controls-position="right" @change="handleChange"
                         :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="场地数" class="form-row">
        <el-input
          placeholder="场地数"
          v-model="ruleForm.title3">
        </el-input>
      </el-form-item>

      <el-form-item label="总占地面积" class="form-row">
        <el-input
          placeholder="总占地面积"
          v-model="ruleForm.title4">
        </el-input>
      </el-form-item>

      <el-form-item label="建成时间" class="form-row">
        <el-date-picker
          v-model="ruleForm.buildTime"
          type="month"
          placeholder="选择修建时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="其他信息" class="form-row">
        <el-input v-model="title5"
                  type="textarea"
                  :rows="3"
                  maxlength="150"
                  placeholder="其他信息"
                  show-word-limit>
        </el-input>
      </el-form-item>

      <el-form-item label="展示图" class="form-row">
        <img-list :display-image-url="displayImageUrl"/>
      </el-form-item>

      <el-form-item class="form-row">
        <el-button type="success" plain style="cursor: pointer" @click="submit" :disabled="isQuerying">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import imgList from "../common/imgList";

  export default {
    components: {
      imgList
    },
    props: {
      venueId: {
        default: -1
      },

      id: {
        default: -1
      }
    },
    watch: {
      id(val) {
        this.id = val;
        this.ruleForm.title = val;
      },
      venueId(val) {
        this.venueId = val;
      }
    },
    data() {
      return {
        displayImageUrl: [],
        ruleForm: {
          title: '',
          num: 1,
          buildTime: '',
          title1: '',
          title2: '',
          title3: '',
          title4: '',
          title5: '',
        }
      }
    },
    mounted() {
      this.ruleForm.title = this.id;
    },
    created() {

    },
  }
</script>

<style scoped>
  #venue_sub_add_container {
    width: 100%;
    margin: 0 auto;
  }

  .demo-form {
    width: 100%;
    padding-top: 15px;
  }

  .form-row {
    width: 100%;
    max-width: 660px;
  }

</style>
