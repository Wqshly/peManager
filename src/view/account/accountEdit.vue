<template>
  <div style="display: inline-block;padding:30px">

    <div style="display: inline-block;width:200px">
      <el-upload
        class="avatar-uploader"
        action="/api/file/imageUpload"
        ref="upload"
        :show-file-list="false"
        :auto-upload="false"
        :on-success="handleAvatarSuccess"
        :on-change="onchange"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button style="margin: 7px 0 0 30px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </div>
    <div style="margin-top: 30px;display: inline-block;vertical-align: top" >   预览: <el-avatar  style="background:white!important; border: solid 1px #a6a6a6;margin-top: 10px" shape="circle" :size="35" :src="imageUrl"></el-avatar></div>

  </div>
</template>

<script>
    export default {
        data() {
            return {
                imageUrl: '',
            };
        },
        methods:{
            submitUpload() {
                this.$refs.upload.submit();
            },
            Cancel() {
                this.$router.push({path:'/account/'});
            },
            beforeAvatarUpload(file) {
                //上传前对图片类型和大小进行判断
                // const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                this.imageUrl = URL.createObjectURL(file);
                return isLt2M;
            },
            onchange(file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            handleAvatarSuccess(res, file) {
                this.$message.success('上传成功,按下CTRL+F5刷新缓存');
                this.$store.commit("setUrl",this.imageUrl);
            },
        },
        mounted() {

        },
    }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
