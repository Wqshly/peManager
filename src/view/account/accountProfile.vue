<template>
  <div class="info-box">
    <div class="profile-box" >
      <h3>公开资料</h3>
      <el-form ref="form" label-position="top" :model="form" :rules="rules">

        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="form.name" ></el-input>
          <span class="span1">当你设置了这一项时，你的真实姓名可能出现在网站上。 当然你可以随时移除它。</span>
        </el-form-item>

        <el-form-item  label="邮箱" prop="email">
          <el-input v-model="form.email" ></el-input>
          <span class="span1">您已将电子邮件地址设置为私人。要切换电子邮件隐私，请转到
              <router-link :to="'/account/account'">账户</router-link>
              并取消选中“保持我的电子邮件地址私有”。</span>
        </el-form-item>

        <el-form-item label="个人介绍" prop="bio">
          <el-input v-model="form.bio" type="textarea"
                    :rows="3"
                    maxlength="150"
                    placeholder="做个自我介绍吧"
                    show-word-limit>
          </el-input>
        </el-form-item>

        <el-form-item label="网站" prop="url">
          <el-input v-model="form.url" ></el-input>
        </el-form-item>

        <el-form-item  label="公司" prop="company">
          <el-input v-model="form.company" ></el-input>
        </el-form-item>

        <el-form-item  label="城市" prop="location">
          <el-input v-model="form.location" ></el-input>
          <span class="span1">此页上的所有字段都是可选的，可以随时删除，填写这些字段即表示您同意在您的公开资料出现在任何位置。请参阅我们的
              <router-link :to="'/account/privacy'"> 隐私声明 </router-link>
              以了解我们如何使用这些信息。</span>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="onSubmit">更改资料</el-button>
          <el-button @click="Cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-box">
      <el-card :body-style="{ padding: '0px' }" v-loading="message.loading">
        <img :src="message.imageUrl" class="image" @error="handle" alt=""/>
        <div style="padding: 14px;">
          <router-link :to="'/account/edit'" ><i class="el-icon-edit">更换头像</i></router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
    import {clone} from "@/api/clone.js"
    export default {
        data() {
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(' '));
                } else {
                    if (value !== '') {
                        var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                        if(!reg.test(value)){
                            callback(new Error('请输入有效的邮箱'));
                        }
                    }
                    callback();
                }
            };
            return {
                timer:null,
                message:{
                    user_data:null,
                    imageUrl:null,
                    loading:true,
                },
                form:{
                    name:null,
                    email:null,
                    bio:null,
                    url:null,
                    company:null,
                    location:null,
                },
                remote_data:{
                    name:"我的名字",
                    email:null,
                    bio:null,
                    url:null,
                    company:null,
                    location:null,
                },
                rules: {
                    email: [
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                }
            };
        },
        methods:{

            onSubmit(){
                alert("提交");
            },
            handle(){
                this.message.loading=true;
            },
            Cancel() {
                this.form = clone.deepClone(this.remote_data);
            },

        },
        mounted() {

        },
        created() {
            this.form =  clone.deepClone(this.remote_data);

            this.timer = window.setTimeout(()=>{
                this.message.imageUrl='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
                this.message.loading = false},5000)
            this.form.name = this.$root.username;
        },

    }
</script>

<style scoped>
  .info-box{
    padding: 0;
    width: 100%;
  }

  .card-box{
    border: 1px solid #ddd;
    margin: 38px 30px 0 30px!important;
    display: inline-block;
  }
  .card-box:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .card-box .image{
    padding:  0;
    width: 200px;
    height: 200px;
    border-bottom: 1px solid #ddd;
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

  .profile-box {
    vertical-align:top;
    width: 100%;
    max-width: 400px;
    margin: 0 20px;
    display: inline-block;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  }

  .profile-box h3{
    font-weight: 400!important;
    font-size: 24px!important;
    border-bottom: 1px solid #ddd!important;
  }

  .profile-box .el-form-item__label{
    font-weight: 600;
  }
  .profile-box .el-form-item{
    margin: 10px 0!important;
  }

  .profile-box .el-input{
    max-width:300px;
    width: 90%;
    margin: 0 100px 0 0;
  }
  .profile-box .el-textarea {
    max-width: 400px!important;
    width: 90% !important;
    margin: 0 100px 0 0!important;
  }

  .el-textarea .el-input__count{
    bottom: 1px!important;
    right: 115px!important;
    width: fit-content;
    line-height: 12px;
  }
  .profile-box .span1{
    font-size: 12px;
    max-width: 400px;
    width: 90%;
    line-height: 18px;
    margin: 4px 0 2px;
    display:block;
  }

  .profile-box .el-button{
    width: 100px;
  }
</style>
