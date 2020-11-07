<template>
  <div>
  <div id="particles"></div>
  <div> <!--class="fill-contain background-pic"-->
    <div class="logo ">
      <img src="../assets/brand.png" alt="">
    </div>
    <transition name="el-fade-in-linear">
      <div class="form-container transition-box">
        <section class="main-form">
          <div class="title">
            <p>管&nbsp;&nbsp;理&nbsp;&nbsp;员&nbsp;&nbsp;登&nbsp;&nbsp;录</p>
          </div>
          <el-form :model="loginForm" style="padding-top: 50px" :rules="rules" ref="loginForm">

            <el-form-item prop="usernumber">
              <el-input v-model="loginForm.usernumber" placeholder="请输入学号"
                        prefix-icon="el-icon-s-custom"
                        clearable>
              </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px" prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-key"
                        show-password clearable>
              </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 5px;">
              <el-link :underline="false" style="float: right;margin-right: 20px" href="https://element.eleme.io" target="_blank">忘记密码</el-link>
            </el-form-item>
            <el-form-item>
              <el-button style="float: left;width: 100px;" @click="login('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </section>
      </div>
    </transition>

  </div>
  </div>
</template>

<script>
    import {api}  from '@/api/ajax'
    import particles from 'particles.js'
export default {
    data() {
      return {
        loginForm: {
          usernumber: null,
          password: null,
        },

        rules: {
          usernumber: [
            {required: true, message: '请输入学号或邮箱', trigger: 'blur'},
            {min: 2, max: 20, message: '请输入正确的学号或邮箱', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login (formName) {
          let _this = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              const url = '/api/login/login';
              api.post(url, this.loginForm).then(res => {
                  if (res.code === 0) {
                      if(res.data.identity !== '网站管理员'){
                          _this.$message.error('你不是网站管理员');
                      } else {
                          _this.$root.user = res.data;
                          _this.$router.push('/management');
                      }

                  } else {
                      _this.$message.error(res.msg);
                  }
              })
            }

        });
      },

    },
    mounted(){
        particlesJS.load('particles','/static/particles.json');
    }

}
</script>

<style lang="less" scoped>
  @import "../style/style";

  #particles{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #dcdfe6;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  .form-container {
    .global-centre(450px, 380px);
    .width-and-height(450px, 380px);
    box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.2);
  }
  .form-container2 {
    .global-centre(450px, 300px);
    .width-and-height(450px, 300px);
  }

  .logo {
    .global-centre(120px, 550px);
    z-index: 999;
  }
  .logo img{
    border-radius: 12px;
    box-shadow:  12px 12px 23px #489dcf,
      -12px -12px 23px #dcdcdc;
    width: 120px;
    height: 120px;
    z-index: 999;
  }
</style>
