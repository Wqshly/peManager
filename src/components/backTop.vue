<template>
  <div class="el-backtop" @click="backToTop" style="right: 100px; bottom: 150px;"><i class="el-icon-caret-top"></i></div>
</template>

<script >

export default {
  data () {
    return{

    };
  },
  methods:{
      backToTop(){
          window.scroll(0,0);
      },
  },


}
</script>

<style scoped>
  .el-backtop {
    position: fixed;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    cursor: pointer;
    z-index: 5;

  }
  .el-backtop:hover{
    background: rgb(233, 233, 235);
  }
</style>
