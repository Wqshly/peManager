<template>
  <div class="all2">
    <div class="normal">
      <div class="header_item_container">
        <div class="img_container" @click="jump2({link:'/'})">
          <img src="../../assets/logo2.png" alt="PE">
        </div>
        <div class="header_item"
             v-for="(item,index) in headers"
             @click="jump(item)"
             :class="[{'active':isActive === item.link && item.link !== '404'},{'float_right' : item.float ==='right'}]">
          <!--一级菜单-->
          <div>
            <i v-if="!item.subs && item.iconName" :class="item.iconName"></i>
            <p v-if="!item.subs && !item.iconName">{{item.name}}</p>
          </div>
          <!--二级菜单-->
          <el-dropdown v-if="item.subs" show-timeout="0" hide-timeout="250" :trigger="item.trigger">
            <div>
              <i v-if="item.iconName" :class="item.iconName"></i>
              <p v-if="!item.iconName">{{item.name}}</p>
            </div>
            <el-dropdown-menu slot="dropdown">
              <div v-for="(sub,index) in item.subs" :key="index">
                <el-dropdown-item v-if="!sub.subs" @click.native="jump2(sub)">{{sub.name}}</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <back></back>
  </div>
</template>

<script>
  import back from '../../components/backTop'

  export default {
    //本组件的当前路由蓝色渲染适用于一级路由  也就是路由路径中的第一个'/'的部分
    components: {
      back,
    },
    data() {
      return {
        isActive: 'activity',
        reverse_headers: [],
        headers: [
          {
            name: '管理首页',
            link: 'management',
          },
          {
            name: '本地比赛',
            link: 'competition',
          },
          {
            name: '区域联赛',
            link: '404'
          },
          {
            name: '器材管理',
            link: '404',
          },
          {
            name: '场地管理',
            link: 'venue',
          },
          {
            name: '账户',
            link: 'account',
            subs: [
              {
                name: '注销',
                link: '/account/logout'
              },
            ],
            float: 'right',
            iconName: 'el-icon-s-custom',
          },
        ],
        drawer: false,

      }
    },
    methods: {
      //一级目录跳转函数   便于渲染active样式
      jump(val) {
        if (!val.noJump) {
          this.drawer = false;
          this.isActive = val.link;
          this.$router.push('/' + val.link + '/management');
        }
      },
      //二级目录跳转函数
      jump2(val) {
        if (!val.noJump) {
          this.drawer = false;
          this.$router.push(val.link);
        }
      },

      logout() {
        api.get('/api/login/logout').then(res => {
        });
        this.$store.commit('setUserId', -1);
        this.$router.push('/login');
      }
    },
    mounted() {

    },
    created() {
      this.reverse_headers = this.$clone.deepClone(this.headers).reverse();
      this.isActive = (this.$route.path).split('/')[1];
    }
  }
</script>

<style scoped>
  .all2 {
    height: 80px;
    width: 100%;
  }

  .all2 .normal {
    width: 100%;
    height: 80px;
    position: fixed;
    top: 0;
    z-index: 1999;
    background-color: white;
    border-bottom: 1px solid #dcdfe6;
  }

  .header_item_container {
    height: 80px;
    line-height: 80px;
    top: 0;
    margin: 0 auto;
    width: 100%;
    max-width: 1140px;
    vertical-align: middle;
  }

  .img_container {
    display: flex;
    cursor: pointer;
    height: 80px;
    float: left;
    align-items: center;
  }

  .header_item_container img {
    height: 30px;
  }

  .normal .header_item_container .header_item {
    line-height: 80px;
    height: 80px;
    margin: 0 0 0 15px;
    float: left;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
  }

  .normal i {
    font-size: 30px;
    vertical-align: middle;
    line-height: 80px;
    cursor: pointer;
    color: #60606d;
  }


  .normal p {
    color: #60606d;
    font-size: 14px;
  }

  .normal p:hover, i:hover {
    color: #409EFF !important;
  }

  .float_right {
    float: right !important;
  }

  .active {
    border-bottom: 2px solid #409EFF;
    color: #409EFF !important;
  }

  .normal {
    display: block;
  }


  /*手机端*/
  @media screen and (max-width: 700px) {

    .img_container {
      display: none!important;
    }
  }

</style>
