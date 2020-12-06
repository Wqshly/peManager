<template>
  <div>
    <div class="main">
      <i class="iconfont icon-guanliyuan" @click="open()"></i>
      <br>
      点击上方图标验证你的权限，进入后台管理

    </div>
  </div>
</template>

<script>


export default {
  //活动中心的父级组件
  name: 'account_profile',
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    open(){
        if(this.$store.state.user.identity == '学校管理员'){
            this.$router.push('/management');
        }
        else{
            this.$message.error('你不是管理员');
        }

    }
  }
}
</script>

<style scoped>
  .main{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top:0;
    margin: auto;
    width: 50%;
    height: 50%;
    text-align: center;

  }


  .main .iconfont:hover{
    font-size: 250px;
    color: #1296db;
  }
  .main .iconfont{
    font-size: 200px;
    margin-bottom: 50px;
    transition: all 1s;
    cursor: pointer;
    color: black;
  }
</style>
