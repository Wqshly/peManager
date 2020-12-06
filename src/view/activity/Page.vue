<template>
  <div class="container">
    <v-header></v-header>
    <div class="page-area">
      <router-menu :headers="items"></router-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
        items: [
            {
                link: '/activity/home',
                name: '活动首页'
            },
            {
                link: '/activity/notice',
                name: '校内通知'
            },
            {
                link: '/activity/promotion',
                name: '发起活动',
            },
            {
                link: '/activity/management',
                name: '活动管理',
            },
            {
                link: '/activity/check',
                name: '组织签到',
            }
        ],
    }
  },

}
</script>

<style scoped>
  .container{
    width: 100%;
    background-color: #f2f5f6;
  }
  .page-area{
    width: 100%;
    max-width: 1140px;
    margin:0 auto;
    min-height: 800px;
    padding-bottom: 40px;
  }

</style>
