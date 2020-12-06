<template>
  <div class="detail_activity1">
    <div class="detail_activity1_date">
    发布者：
    {{detail_item.name}}
    &nbsp;&nbsp;&nbsp;&nbsp;发布日期:
    {{detail_item.date}}
      <span style="float: right;">{{detail_item.status}}</span>
    </div>
    <div class="detail_activity1_content">
      <el-form :model="detail_item" ref="detail_item" label-width="100px" class="demo-detail_item" style="width: 100%">
        <el-form-item label="活动名称:">
          {{detail_item.title}}
        </el-form-item>

        <el-form-item label="活动简介:">
          {{detail_item.description}}
        </el-form-item>

        <el-form-item label="归属组织:">
          {{detail_item.checker.region}}
        </el-form-item>

        <el-form-item label="活动地点:">
          {{detail_item.position}}
        </el-form-item>

        <el-form-item label="活动分类:" >
          {{detail_item.class}}
        </el-form-item>

        <el-form-item label="参加费用:" >
          {{detail_item.fee}}


        </el-form-item>

        <el-form-item label="费用说明:" >
          {{detail_item.fee_description}}
        </el-form-item>

        <el-form-item label="需要签退:">
          <span v-show="detail_item.signOut">是</span>
          <span v-show="!detail_item.signOut">否</span>
        </el-form-item>

        <el-form-item label="报名起止:" >
          {{detail_item.signUp_time_start}}
          &nbsp;至&nbsp;
          {{detail_item.signUp_time_end}}
        </el-form-item>

        <el-form-item label="活动起止:" prop="activity_time_start">
          {{detail_item.activity_time_start}}
          &nbsp;至&nbsp;
          {{detail_item.activity_time_end}}
        </el-form-item>

        <el-form-item label="活动人数:" >
          {{detail_item.now_people}}/{{detail_item.numberOfPeople}}
        </el-form-item>

        <el-form-item label="活动院系:" >
          <span  v-show="detail_item.college_checkAll" >全部</span>
            <el-checkbox-group class="transition-box" v-model="detail_item.college" v-show="!detail_item.college_checkAll">
              <el-checkbox v-for="item in detail_item.college "
                           :label="item"
                           :key="item"
                           :value="item"
                           disabled></el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="活动年级:" >
          <span v-show="detail_item.activity_grade_checkAll">全部</span>
            <el-checkbox-group class="transition-box" v-model="detail_item.activity_grade" v-show="!detail_item.activity_grade_checkAll">
              <el-checkbox v-for="item in detail_item.activity_grade"
                           :label="item"
                           :key="item"
                           :value="item"
                            disabled></el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="联系人:">
          {{detail_item.contact_name}}
        </el-form-item>

        <el-form-item label="联系人方式:" >
          {{detail_item.contact_method}}
        </el-form-item>

        <el-tooltip class="item" effect="dark" content="报名制:报名不需要审核，人满截止  审核制：报名需审核" placement="top-start">
          <el-form-item label="报名方式:" >
            {{detail_item.sign_method}}
          </el-form-item>
        </el-tooltip>

        <el-form-item label="外勤打卡:">
          <span v-show="detail_item.delivery">是</span>
          <span v-show="!detail_item.delivery">否</span>
        </el-form-item>

      </el-form>

    </div>

  </div>
</template>

<script>
    export default {
        props: ["detail_item"],
        data () {
            return {

            };
        },
        methods: {
        },
        watch: {
            detail_item: {
                deep: true,
                handler(nv, ov) {
                    this.detail_item = nv;
                    console.log('监听:');
                    console.log(nv);
                }
            }
        },
    }
</script>

<style>
  .detail_activity1{
    margin-top: 20px;
    width: 100%;
  }
  .detail_activity1 .detail_activity1_date{
    font-size: 15px;
    font-weight: 300;
    padding-bottom: 20px;
    border-bottom:1px solid #ebebeb;
  }
  .detail_activity1 .detail_activity1_content{
    margin-top: 20px;
  }
</style>
