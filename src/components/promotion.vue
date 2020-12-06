<template>
  <div class="activity-promotional">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="活动名称" prop="title">
        <el-input
          filterable placeholder="活动名称"
          v-model="ruleForm.title">
        </el-input>
      </el-form-item>

      <el-form-item label="活动简介" prop="description">
        <el-input
          type="description"
          placeholder="请输入活动简介"
          v-model="ruleForm.description"
          maxlength="250"
          :autosize="{ minRows: 3, maxRows: 5}"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item label="活动区域" prop="region">
        <el-select
          v-model="ruleForm.region"
          filterable placeholder="活动区域">
          <el-option
            v-for="item in options.region"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="审核人" prop="checker">
        <el-select
          placeholder="所属组织"
          v-model="ruleForm.checker.region">
          <el-option
            v-for="item in options.checker_region"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>

        </el-select>
        <el-select
          placeholder="姓名"
          prop="checker"
          v-model="ruleForm.checker.name">
          <el-option
            v-for="item in options.checker_name"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="活动地点" prop="position">
        <el-input
          placeholder="活动地点"
          v-model="ruleForm.position"
          clearable>
        </el-input>
      </el-form-item>

      <el-form-item label="活动分类" prop="class">
        <el-radio v-model="ruleForm.class"
                  v-for="item in options.class"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
        >{{item.value}}</el-radio>
      </el-form-item>

      <el-form-item label="参加费用" prop="fee">
        <el-input
          placeholder="参与费用"
          v-model="ruleForm.fee"
          clearable>
        </el-input>
      </el-form-item>

      <el-form-item label="需要签退">
        <el-switch v-model="ruleForm.signOut"></el-switch>
      </el-form-item>

      <el-form-item label="报名起止" prop="signUp_time_start">
        <el-date-picker
          v-model="ruleForm.signUp_time_start"
          type="datetime"
          placeholder="报名开始时间"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
        --
        <el-date-picker
          v-model="ruleForm.signUp_time_end"
          type="datetime"
          placeholder="报名结束时间"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="活动起止" prop="activity_time_start">
        <el-date-picker
          v-model="ruleForm.activity_time_start"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
        --
        <el-date-picker
          v-model="ruleForm.activity_time_end"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="活动人数" >
        <el-tooltip class="item" effect="dark" content="默认为无限制" placement="top">
          <el-input
            filterable placeholder="活动区域"
            v-model="ruleForm.numberOfPeople">
          </el-input>
        </el-tooltip>

      </el-form-item>

      <el-form-item label="活动院系" >
        <el-switch active-text="全选" v-model="ruleForm.college_checkAll" ></el-switch>
        <transition name="el-zoom-in-top">
          <el-checkbox-group class="transition-box" v-model="ruleForm.college" v-show="!ruleForm.college_checkAll">
            <el-checkbox v-for="item in options.college "
                         :label="item"
                         :key="item"
                         :value="item"></el-checkbox>
          </el-checkbox-group>
        </transition>
      </el-form-item>

      <el-form-item label="活动年级" >
        <el-switch active-text="全选" v-model="ruleForm.activity_grade_checkAll" ></el-switch>
        <transition name="el-zoom-in-top">
          <el-checkbox-group class="transition-box" v-model="ruleForm.activity_grade" v-show="!ruleForm.activity_grade_checkAll">
            <el-checkbox v-for="item in options.activity_grade "
                         :label="item"
                         :key="item"
                         :value="item"></el-checkbox>
          </el-checkbox-group>
        </transition>
      </el-form-item>

      <el-form-item label="联系人">
        <el-input
          filterable placeholder="联系人"
          v-model="ruleForm.contact_name">
        </el-input>
      </el-form-item>

      <el-form-item label="联系人方式" >
        <el-input
          filterable placeholder="联系方式"
          v-model="ruleForm.contact_method">
        </el-input>
      </el-form-item>

      <el-tooltip class="item" effect="dark" content="报名制:报名不需要审核，人满截止  审核制：报名需审核" placement="top-start">
        <el-form-item label="报名方式" >
          <el-radio v-model="ruleForm.sign_method"
                    v-for="item in options.sign_method"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
          >{{item.value}}</el-radio>
        </el-form-item>
      </el-tooltip>

      <el-form-item label="外勤打卡">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>

      <el-form-item label="活动海报">
        <div style="height:fit-content;width:fit-content">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            :show-file-list="false"
            :auto-upload="false"
            :on-success="handleAvatarSuccess"
            :on-change="onchange"
            :before-upload="beforeAvatarUpload">
            <img width="100%" v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">发起活动</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {api}  from '@/api/ajax'
    export default {

        data () {
            return {
                havaPic:false,
                notifyPromise:Promise.resolve(),
                ruleForm: {
                    title: '',
                    description: '',
                    region: '',
                    checker: {
                        region:'',
                        name:''
                    },

                    position:'',
                    class:'',
                    fee:'0',
                    signOut:true,
                    signUp_time_start:'',
                    signUp_time_end:'',
                    activity_time_start:'',
                    activity_time_end:'',
                    numberOfPeople:'无限制',
                    college_checkAll: true,
                    college:['学院1','学院2','学院3','学院4','学院5','学院6','学院7','学院8','学院9','学院10'],
                    activity_grade_checkAll: true,
                    activity_grade:['2015','2016','2017','2018','2019','2020','2021'],
                    contact_name:'',
                    contact_method:'',
                    sign_method:'报名制',
                    delivery: false,
                    imageUrl:'',
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                options: {
                    region:[
                        { value: '选项1', },
                        { value: '选项2', },
                        { value: '选项3', },
                        { value: '选项4', },
                        { value: '选项5', }
                    ],

                    checker_region:[
                        { value: '选项1', },
                        { value: '选项2', },
                        { value: '选项3', },
                        { value: '选项4', },
                        { value: '选项5', }
                    ],

                    checker_name:[
                        { value: '选项1', },
                        { value: '选项2', },
                        { value: '选项3', },
                        { value: '选项4', },
                        { value: '选项5', }
                    ],
                    class:[
                        { value: '思想政治', },
                        { value: '社会实践', },
                        { value: '文化艺术', },
                        { value: '学术科学', },
                        { value: '社会工作', }
                    ],
                    college:['学院1','学院2','学院3','学院4','学院5','学院6','学院7','学院8','学院9','学院10'],
                    activity_grade:['2015','2016','2017','2018','2019','2020','2021'],
                    sign_method:[
                        { value: '报名制', },
                        { value: '审核制', }
                    ],
                },
                rules: {
                    title: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入活动简介', trigger: 'change' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    checker: [
                        {required: true, message: '请选择审核人', trigger: 'change' }
                    ],
                    position: [
                        { required: true, message: '请指定活动地点', trigger: 'change' }
                    ],
                    class: [
                        { required: true, message: '请选择活动性质', trigger: 'change' }
                    ],
                    fee: [
                        { required: true, message: '请输入费用', trigger: 'change' }
                    ],
                    signUp_time_start: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    activity_time_start: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],

                }
            };
        },
        methods: {
            notify(msg) {
                this.notifyPromise = this.notifyPromise.then(this.$nextTick).then(()=>{
                    this.$notify({
                        title: msg,
                    });
                })
            },

            //表单提条按钮,填写合法逻辑=>上传图片逻辑
            submitForm(formName) {
                if(this.havaPic == false){
                    this.$notify.error({
                        title: '请上传一张海报',
                        duration: 0
                    });
                }
                else{
                    this.$refs[formName].validate((valid) => {
                        if (1) {
                            this.notify('正在上传，请稍后');
                            this.submitUpload();
                        } else {
                            this.notify('error submit!!');
                            return false;
                        }
                    });
                }
            },

            //上传图片逻辑=>beforeAvatarUpload=>handleAvatarSuccess
            submitUpload() {
                this.$refs.upload.submit();
            },
            remote_api(file){
                let url = '/api/activity/addActivity/'+this.$store.state.user.id;
                let data = new FormData();
                data.append('pictureFile',file);
                data.append('activityName',this.ruleForm.title);
                data.append('activityContent',this.ruleForm.description);
                data.append('publisherId',this.$store.state.user.id);
                data.append('publishData',new Date());
                data.append('contact',this.ruleForm.contact_name);
                data.append('contactPhone',this.ruleForm.contact_method);
                data.append('registrationClosingTime',this.ruleForm.signUp_time_end);
                data.append('registrationStartTime',this.ruleForm.signUp_time_start);
                data.append('startTime',this.ruleForm.activity_time_start);
                data.append('endTime',this.ruleForm.activity_time_end);
                data.append('activityClassification',this.ruleForm.class);
                data.append('eventLocation',this.ruleForm.position);
                data.append('participationFee',this.ruleForm.fee);

                api.upload(url,data).then(res => {
                    if (res.code === 0) {
                        this.$message.success('成功!');
                        this.$router.push('/activity');
                    }
                    else{
                        this.$message.error(res.msg);
                    }
                })
            },

            //上传前对图片类型和大小进行判断
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                let isLt2M = file.size / 1024 / 1024 < 2;
                let _URL = window.URL || window.webkitURL;

                if (!isLt2M) {
                    this.$notify.error({
                        title: '请更换图片',
                        message: '上传图片大小不能超过 2MB!',
                        duration: 0
                    });
                }
                new Promise((resolve, reject) => {
                    let img = new Image();
                    img.src = _URL.createObjectURL(file)
                    img.onload = function() {

                        if(this.width > this.height){
                            resolve(true);
                        }else {
                            resolve(false);
                        }
                    };

                }).then((res) => {
                    if(!res){
                        this.$notify.error({
                            title: '请更换图片',
                            message: '上传图片的宽度必须大于高度!',
                            duration: 0
                        });
                    }
                    else{
                        this.remote_api(file);
                    }
                });
                return false;
            },

            handleAvatarSuccess(res, file) {
                this.notify('永远不会到达的代码 因为before返回的false');
                this.notify('上传成功');
            },
            //选择了新的图片
            onchange(file) {
                this.havaPic = true;
                this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
            },


        },
        mounted() {
            this.ruleForm.description = this.$store.state.activityClass;
        },
    }
</script>

<style>
  .activity-promotional{
    width: 90%;
  }
  .activity-promotional .el-select>.el-input {
    width: 130px!important;
  }
  .activity-promotional .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .activity-promotional .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .activity-promotional .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .activity-promotional .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .activity-promotional .el-form{
    width:100%;
    max-width: 660px;

  }

</style>
