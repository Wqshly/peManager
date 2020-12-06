<template>
<div class="account_security">
  <div class="security-box" >
    <h3>密码</h3>
    <div class="security-box-item">
      <el-form
        label-position="top"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="medium">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>


  </div>
</div>
</template>

<script>


export default {
  //活动中心的父级组件
    name: 'account_profile',
    data() {
        var validateOldPass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('不能为空'));
            }

        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                pass: '',
                checkPass: '',
                oldPass: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                oldPass: [
                    { validator: validateOldPass, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.demo-ruleForm{
  width: 90%;
}


.security-box {
  vertical-align:top;
  width: 100%;
  margin: 0 20px;
  display: inline-block;
  font-size: 16px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
}

.security-box h3{
  font-weight: 400!important;
  font-size: 24px!important;
  border-bottom: 1px solid #ddd!important;
}

.security-box .span1{
  font-size: 12px;
  width: 90%;
  line-height: 18px;
  margin: 4px 0 2px;
  display:block;
}

.security-box .span2{
  width: 90%;
  line-height: 18px;
  margin:20px 0 10px;
  display:block;
}
.security-box .el-button{
  width: 100px;
}

.security-box-item{
  width: 90%;
  margin: 30px 0;
}

</style>
