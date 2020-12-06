<template>
  <div>
    <v-header></v-header>
    <div class="account-container">
      <n-route :message_count="message_count" :options="options"></n-route>
      <router-view class="account_main">
      </router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import nRoute from '@/components/routerByAdaptiveMenu'
export default {
  components: {
      nRoute
  },
  data () {
    return {
        message_count:12,
        options:[
            {
                name:'资料',
                link:'/account/profile',
            },
            {
                name:'消息',
                link:'/account/message',
            },
            {
                name:'账户',
                link:'/account/account',
            },
            {
                name:'安全',
                link:'/account/security',
            },
            {
                name:'后台',
                link:'/account/management',
            },
            {
                name:'注销',
                link:'/account/logout',
            },
        ],
    }
  },
  methods:{

  },
  created() {

  },

}
</script>

<style scoped>
  .account-container{
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    max-width: 1140px;
  }

  .account-container .account_main{
    float: left;
    padding-top: 10px;
    width: 100%;
    min-height: 700px;
  }

  @media (min-width: 760px) {
    .account-container .account_main{
      padding-top: 10px;
      width: calc(100% - 160px)!important;
      min-height: 700px;
    }

  }
</style>
