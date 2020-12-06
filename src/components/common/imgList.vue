<template>
  <div class="row">
    <div class="button-container">
      <el-button type="primary" plain style="cursor: pointer">添加图片</el-button>
      <input ref="display" type="file" accept="image/*" @change="changeDisplay"/>
    </div>

    <div class="tags">
      <div v-for="(item,index) in displayImageUrl" style="padding: 10px">
        <el-tag
          :key="item.name"
          closable
          :disable-transitions="false"
          @close="handleRemoveImg(index)">
          {{item.name}}
        </el-tag>
      </div>
    </div>
    <carousel :show-name="true" v-if="displayImageUrl.length !== 0" :data="displayImageUrl" style="width: 100%;"/>
  </div>


</template>

<script>
  import carousel from "./carousel";
  export default {
    components: {
      carousel
    },
    props: {
      displayImageUrl: {
        default: [
          {
            name: "1.png",
            url: "http://www.xiaoyuanpe.com/1.png"
          }
        ]
      },
    },
    data() {
      return {

      };
    },
    methods: {
      checkImg(file) {
        let errorMsg;
        if(!file){
          return false;
        }
        if (file.type.split('/')[0] !== 'image') {
          errorMsg = '不支持的图片格式';
        }

        if (file.size / 1024 / 1024 > 10) {
          errorMsg = '上传图片大小不能超过 10MB!';
        }

        if (errorMsg) {
          this.$notify.error({
            title: '请更换图片',
            message: errorMsg,
            duration: 10000
          });
          return false;
        }
        return true;
      },
      handleRemoveImg(index){
        this.displayImageUrl.splice(index,1);
      },
      addDisplayImg(name,url){
        this.displayImageUrl.push({
          name: name,
          url: url,
          file: this.$refs.display.files[0]
        });
        console.log(this.displayImageUrl)
      },

      changeDisplay() {
        let previewFile = this.$refs.display.files[0];
        if (this.checkImg(previewFile)) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.addDisplayImg(this.$refs.display.files[0].name,e.target.result);
          };
          reader.readAsDataURL(previewFile);
        }
      },

    },
    mounted() {

    },
    beforeDestroy() {

    }


  }
</script>

<style scoped>
  .row {
    width: 100%;
  }

  .tags {
    width: 100%;
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  .button-container {
    cursor: pointer;
    position: relative;
    width: fit-content;
    height: fit-content;
  }

  input {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
</style>
