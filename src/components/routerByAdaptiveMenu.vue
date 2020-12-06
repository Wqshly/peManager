<template>
  <div class="options">
    <div class="option" v-for="option in options"  @click="jump(option)" :class="{'active':isActive === option.link || isActive === option.secondLink}" >

        {{option.name}}
      <el-badge :value="message_count" class="item" v-if="option.link==='/account/message'">
      </el-badge>
    </div>
  </div>
</template>

<script>
export default {
  //该组件只适用于最末级路由
  props:{
      message_count:null,
      options:null,
  },
  data () {
    return {
        isActive:'',
    }
  },
  methods:{
      jump(val){
          this.$router.push(val.link);
      },

  },
  mounted() {
      this.isActive = this.$route.path;
  },
  created() {

  },
  watch:{
      $route(to,from){
          this.isActive = to.path.split('?')[0];
      }
  },
}
</script>

<style scoped>
  .iconfont{
    font-size: 30px;
    vertical-align: middle;
  }
  .options{
    background-color: white;
    overflow: hidden;
    width: 140px;
    padding:0 10px ;
    font-weight: 400;
    float: left;
  }
  .option{
    padding-left: 10px;
    line-height: 37px;
    margin: 4px 0;
    font-size: 14px;
    border-radius: 6px;
    transition: background-color 0.3s;
    background-color: white!important;
    cursor: pointer;
  }
  .option:hover{
    background-color: #409EFF!important;
    color: white;
  }
  .active{
    background-color: #409EFF!important;
    color: white!important;
  }
  @media (max-width: 760px) {
    .options{
      width: 100% !important;
      display: flex;
      margin: 0;
      flex-wrap: wrap;
    }

    .option{
      margin: 0 2px;
      padding-right: 15px;
    }
  }

</style>
