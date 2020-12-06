<template>
  <div id="phone">
    <i class="el-icon-s-fold" @click.stop="drawer = !drawer" :class="{'active': drawer === true }"></i>
    <i class="el-icon-s-custom" @click.stop="jump('account')" :class="{'active':isActive === 'account' }"></i>
    <div id="phone_item_container" v-if="drawer">
      <div class="header_phone_item"
           v-if="item.name !=='学校管理' || $store.state.user.identity == '学校管理员'"
           v-for="item in headers"
           @click.stop="jump(item.link)"
           :class="{'active':isActive === item.link && item.link !== '404'}">
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      headers: []
    },
    data() {
      return {
        isActive: 'activity',
        drawer: false,
      }
    },
    methods: {
      jump(val) {
        this.drawer = false;
        this.isActive = val;
        if(val === 'management') {
          window.open('/#/management');
        } else {
          this.$router.push('/' + val);
        }
      },
    },
    mounted() {
    },
    created() {
      this.isActive = (this.$route.path).split('/')[1];
    }
  }
</script>

<style scoped>
  #phone {
    width: 100%;
    z-index: 9999;
    position: fixed;
    top: 0;
    overflow: hidden;
    color: white;
    line-height: 50px;
    height: 60px;
    background-color: #1B1C20;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #phone_item_container {
    position: fixed;
    width: 100%;
    top: 60px;
    z-index: 9999;
    background-color: white;
    border: black 1px solid;
  }

  i {
    margin: 0 20px;
    font-size: 24px;
  }

  .active {
    color: #409EFF !important;
  }

  .header_phone_item {
    width: 100%;
    cursor: pointer;
    transition: background-color 0.5s, color 0.5s;
    line-height: 30px;
    color: #1B1C20;
  }

  .header_phone_item:hover {
    background-color: #1B1C20;
    color: white;
  }

  .header_phone_item p {
    margin-left: 82px;
  }
</style>
