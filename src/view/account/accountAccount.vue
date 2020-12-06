<template>
  <div class="info-box">
    <div class="account-box" >
    <h3>更改账户信息</h3>

    <div class="account-box-item">
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-ziliao"></use>
      </svg>
      用户ID
      <span class="span2">{{form.username}}</span>
      <span class="span1">更改你的用户ID可能会出现一些异常</span>
      <el-button type="warning" @click="onSubmit">更改</el-button>
    </div>

    <div class="account-box-item">
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-wechat"></use>
      </svg>
      微信
      <span class="span2"> {{form.WeChat}}</span>
      <el-button plain @click="onSubmit">绑定</el-button>
    </div>

    <div class="account-box-item">
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-QQ1"></use>
      </svg>
      QQ
      <span class="span2"> {{form.QQ}}</span>
      <el-button plain @click="onSubmit">绑定</el-button>
    </div>

    <div class="account-box-item">
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-shouji"></use>
      </svg>
      手机

      <el-input v-model="form.phone" ></el-input>
      <el-button plain @click="onSubmit">更改绑定</el-button>
    </div>

    <div class="account-box-item">
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-youxiang"></use>
      </svg>
      邮箱

      <el-input v-model="form.email" ></el-input>
      <div v-if="remote_data.email!=='还没绑定'">
        <el-switch v-model="form.value1" active-text="保持我的电子邮件地址私有" @change="privacy()" :disabled="onLoading"></el-switch>
        <span class="span1" style="color:red;" v-if="onLoading===true">
        禁止频繁开关，请等待20秒</span>
        <span class="span1">
        因为您已启用电子邮件隐私，你的电子邮箱将用于帐户相关通知以及密码重置</span>
      </div>
      <el-button plain @click="onSubmit">更改绑定</el-button>
    </div>

    <h3 style="color:red;">删除账户</h3>
    <span class="span2"  style="color:red;">一旦删除账户，所有账户资料将无法找回！</span>
    <el-button  type="danger" plain @click="onSubmit">删除账号</el-button>

    </div>
  </div>
</template>

<script>
    import {clone} from "@/api/clone.js"
    export default {

        data() {
            return {
                onLoading:false,
                form:{
                    username:"无",
                    value1:true,
                    QQ:'还没绑定',
                    WeChat:'还没绑定',
                    phone:'还没绑定',
                    email:'还没绑定',
                },
                remote_data:{
                    username:"admin",
                    value1:true,
                    QQ:'还没绑定',
                    WeChat:'还没绑定',
                    phone:'还没绑定',
                    email:'还没绑定',
                },


            };
        },
        methods:{
            openM() {
                this.$prompt('请输入邮箱', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            privacy(){
                this.onLoading = true;
                window.setTimeout(()=>{
                    this.onLoading = false;
                },20000)
            },
            onSubmit(){
                alert("还没设计")
            },
            Cancel() {
                this.$router.push({path:'/account/'});
            },

        },
        mounted() {

        },
        created() {

          this.form = clone.deepClone(this.remote_data);
          this.form.username = this.$store.state.user.id;
        },

    }
</script>

<style scoped>
  .info-box{
    padding: 0;
    width: 100%;
  }
  .info-box .icon{
    font-size: 24px;
  }
  .info-box a , .info-box a:visited{
    text-decoration: none;
    font-size: 14px!important;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 400;
    color: #409EFF;
    transition:0.15s ease-out;
  }

  .account-box {
    vertical-align:top;
    width: 100%;
    margin: 0 20px;
    display: inline-block;
    font-size: 16px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  }

  .account-box h3{
    font-weight: 400!important;
    font-size: 24px!important;
    border-bottom: 1px solid #ddd!important;
  }

  .account-box .span1{
    font-size: 12px;
    width: 90%;
    line-height: 18px;
    margin: 4px 0 2px;
    display:block;
  }

  .account-box .span2{
    width: 90%;
    line-height: 18px;
    margin:20px 0 10px;
    display:block;
  }
  .account-box .el-button{
    width: 100px;
  }

  .account-box-item{
    width: 90%;
    margin: 30px 0;
  }

  .account-box .el-input{
    display: block;
    max-width: 300px!important;
    margin: 10px 0!important;
  }
</style>
