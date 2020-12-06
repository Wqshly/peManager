<template>
  <div>
    <div class="main-nav">
      <div class="main">
        <h3>{{remote_data.testName}}</h3>
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <template v-for="(question,i) in remote_data.questions">
            <el-card class="box-card-wrong box-card" shadow="hover" v-if="question.type ==1">
              单选题 id{{ i+1 }}:
              {{question.title}}
              <el-form-item></el-form-item>
              <el-form-item>
                <el-radio-group v-model="question.answer"  style="line-height: 40px!important;" >
                  <el-radio style="width: 100%!important;" label="1">A. {{question.a}}</el-radio>
                  <el-radio style="width: 100%!important;" label="2">B. {{question.b}}</el-radio>
                  <el-radio style="width: 100%!important;" label="3">C. {{question.c}}</el-radio>
                  <el-radio style="width: 100%!important;" label="4">D. {{question.d}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-card>
            <el-card class="box-card-wrong box-card" shadow="hover" v-if="question.type ==2">
              多选题 id{{ i+1 }}:
              {{question.title}}
              <el-form-item></el-form-item>
              <el-form-item>
                <el-checkbox-group v-model="question.answer"  style="line-height: 40px!important;" >
                  <el-checkbox style="width: 100%!important;" label="1">A. {{question.a}}</el-checkbox>
                  <el-checkbox style="width: 100%!important;" label="2">B. {{question.b}}</el-checkbox>
                  <el-checkbox style="width: 100%!important;" label="3">C. {{question.c}}</el-checkbox>
                  <el-checkbox style="width: 100%!important;" label="4">D. {{question.d}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-card>
            <el-card class="box-card-wrong box-card" shadow="hover" v-if="question.type ==3">
              判断题 id{{ i+1 }}:
              {{question.title}}
              <el-form-item></el-form-item>
              <el-form-item>
                <el-radio-group v-model="question.answer"  style="line-height: 40px!important;" >
                  <el-radio style="width: 100%!important;" label="1">正确</el-radio>
                  <el-radio style="width: 100%!important;" label="2">错误</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-card>
          </template>


          <el-form-item style="margin-top: 20px">
            <el-button  type="success" round @click="open">提交</el-button>
          </el-form-item>

        </el-form>
      </div>

    </div>
  </div>
</template>

<script>

import {api} from "@/api/ajax"
export default {
  //活动中心的父级组件
  name: 'theory_page',
    data() {
        return {
            remote_data: {
                testIndex: 1,
                testName: '章名',
                questions: [
                    {
                        "a": "选项",
                        "b": "选项",
                        "c": "选项",
                        "d": "选项",
                        "title": "问题描述1",
                        "index": 1,
                        "questionId": 1,
                        "answer":[],
                        "type":1,
                    },
                    {
                        "a": "选项",
                        "b": "选项",
                        "c": "选项",
                        "d": "选项",
                        "title": "问题描述2",
                        "index": 1,
                        "questionId": 1,
                        "answer":[],
                        "type":2,
                    },
                    {
                        "a": "选项",
                        "b": "选项",
                        "c": "选项",
                        "d": "选项",
                        "title": "问题描述3",
                        "index": 1,
                        "questionId": 1,
                        "answer":[],
                        "type":3,
                    },
                ],
            },
            form: {
                resource: [],
                index:1
            }
        }
    },
    methods: {

        //处理表格数据
        handleData(){
            let temp_data = this.remote_data.filter(data=>this.filter(data));
            this.total=temp_data.length;
            return temp_data.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        },

        //搜索筛选
        filter(val){
            return (!this.input || val.test_name.toLowerCase().includes(this.input.toLowerCase()));
        },


        //每页条数
        handleSizeChange(val) {
            this.pageSize=val;
            /*console.log(`每页 ${val} 条`);*/
        },

        //当前页数
        handleCurrentChange(val) {
            /*console.log(`当前页: ${val}`);*/
        },

        open(){
            this.$message.success('恭喜你，提交成功');
        },

    },
    mounted() {

    },
    created() {
      console.log(this.$route.query.id);
    },
}
</script>

<style scoped>

  .main-nav {
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;

  }
  .main-nav h3{
    font-size: 24px;
    font-weight: 400;
    line-height: 48px ;
  }

  .box-card{
    margin-bottom: 20px;
  }



</style>
