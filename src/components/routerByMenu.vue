<template>
  <div class="all_menu" :class="[{'center': center}]">
    <div class="menu" v-for="(item,index) in headers" @click="jump(item.link)"
         :class="[{'active': isActive === item.link || isActive === item.secondLink}]">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    /*传递如下结构从而使用该组件
    //该组件只适用于最下级路由
    link 点击跳转路径
    link secondLink 与当前路由相同时 高亮该选项
    headers: [
        {
            link: '/theory/home',
            name: '理论学习',
            secondLink:'/theory/theory'
        },
     ],*/
    props: {
      headers: {
        default: null
      },
      center: {
        default: false
      },
    },
    data() {
      return {
        isActive: '',
      }
    },
    methods: {
      jump(val) {
        if ((val) !== this.$route.path) {
          this.$router.push(val);
          window.scrollTo(0, 0);
        }
      },
    },
    mounted() {
      this.isActive = this.$route.path;
    },
    created() {
    },
    watch: {
      $route(to, from) {
        this.isActive = to.path.split('?')[0];
      }
    },
  }
</script>

<style scoped>
  .all_menu {
    line-height: 50px;
    overflow: hidden;
    width: 100%;
    margin-bottom: 1px;
    background-color: transparent;
  }

  .center {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .menu {
    float: left;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    padding: 0 10px;
    border-bottom: 1px solid #dcdfe6;
  }

  .menu:hover {
    color: #409EFF !important;
  }

  .active {
    border-bottom: 2px solid #409EFF;
    color: #409EFF !important;
  }
</style>
