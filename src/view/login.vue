<template>
  <div>
    <div id="particles"></div>
    <div id="container">
      <div class="form-container" v-show="!VRCODE">
        <div class="form-row title">
          <p>管&nbsp;&nbsp;理&nbsp;&nbsp;员&nbsp;&nbsp;登&nbsp;&nbsp;录</p>
        </div>

        <div class="form-row">
          <el-input v-model="loginForm.usernumber"
                    placeholder="请输入学号"
                    clearable>
          </el-input>
        </div>
        <div class="form-row">
          <el-input type="password"
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                    show-password
                    clearable>
          </el-input>
        </div>
        <div class="form-row">
          <el-button style="width: 100px;" @click="login" type="success" :disabled="loginDisable">登录</el-button>

        </div>
      </div>
      <div class="form-container" v-show="VRCODE">
        <div class="form-row title">
          <p>扫&nbsp码&nbsp登&nbsp录</p>
        </div>
        <div class="form-row">
          <img src="../assets/img/login/app_icon.png" alt="">
        </div>
        <p class="form-row login-for-code" @click="show">返回账号登录</p>
      </div>
    </div>
  </div>
</template>

<script>
  import particles from 'particles.js'

  export default {
    data() {
      return {
        VRCODE: false,
        loginForm: {
          schoolId: null,
          usernumber: null,
          password: null,
        },
        registerForm: {
          userNumber: "未设置",
          username: "未设置",
          password: "123456",
          age: 0,
          sex: "未设置",
          unit: "未设置",
          identity: "学生",
          phone: "未设置",
          email: "未设置",
          schoolId: null
        },
        options: [
          {
            id: 1,
            schoolName: '山东科技大学',
          },
        ],
        loginDisable: false,
      }
    },
    methods: {
      show() {
        this.VRCODE = !this.VRCODE;
      },
      requestSchoolList() {
        let url = '/api/school/querySchoolList';
        this.$api.get(url).then(res => {
          if (res.code === 0) {
            this.options = this.$clone.transObjectToList(res.data);
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      login() {
        if (!this.loginDisable) {
          this.loginDisable = true;
          let url = '/api/login/login';
          this.$api.post(url, this.loginForm).then(res => {
            this.loginDisable = false;
            if (res.code === 0) {
              if(res.data.identity !== '网站管理员'){
                _this.$message.error('你不是网站管理员');
              } else {
                this.$router.push('/management');
                this.$store.commit('setUser', res.data);
              }
            } else {
              this.$message.error(res.msg);
            }
          })
        }

      },
      register(formName) {
        this.registerForm.password = this.loginForm.password;
        this.registerForm.schoolId = this.loginForm.schoolId;
        this.registerForm.userNumber = this.loginForm.usernumber;
        let url = '/api/user/addUser';
        this.$api.post_JSON(url, this.registerForm).then(res => {
          if (res.code === 0) {
            this.$message.success('注册成功!');
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      keyDown(e) {
        if (e.keyCode === 13) {
          this.login();
        }
      }
    },
    mounted() {
      particlesJS.load('particles', '/static/particles.json');
      window.addEventListener('keydown', this.keyDown);
    },
    created() {
      this.requestSchoolList();
    }

  }
</script>

<style scoped>
  #particles {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #dcdfe6;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  #container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
  }

  .form-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    height: fit-content;
    width: 500px;
  }

  .form-row {
    padding: 10px 0;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  .title {
    font-size: 24px;
    font-weight: 400;
    padding-bottom: 10px;
  }

  .el-form-row__content {
    display: flex !important;
    width: 100% !important;
    justify-content: space-around !important;
  }

  .login-for-code {
    cursor: pointer;
    font-size: 15px;
    color: #409eff;
  }

  img {
    width: 350px;
    height: 350px
  }

  @media screen and (max-width: 351px) {
    img {
      width: 100%;
      height: 100%;
    }

    .form-container {
      width: 100%;
    }
  }
</style>
