<template>
  <div>
    <div class="management_page">
      <v-header></v-header>
      <div class="management_main">
        <el-menu
                 mode="horizontal"
                 active-text-color="#409EFF;"
                 unique-opened router
                  @select="handleSelect">
          <template v-for="item in items">
            <!--        有子目录的-->
            <template v-if="item.subs">
              <el-submenu :index="item.index" :key="item.index" class="el-menu-item">
                <template slot="title">
                  <span slot="title">{{item.title}}</span>
                </template>
                <!--            子目录下拉内容-->
                <template v-for="subItem in item.subs">
                  <el-menu-item :index="subItem.index" :key="subItem.index">
                    <span>{{subItem.title}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>

            <!--        无子目录的-->
            <template v-else>
              <el-menu-item :index="item.index" :key="item.index">
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </template>

          </template>
        </el-menu>

        <router-view>

        </router-view>
      </div>

      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
import vHeader from '@/components/aheader'
import vFooter from '@/components/footer'
export default {
  name: 'accountPage',
  components: {
      vFooter,
      vHeader
  },
  data () {
    return {
        user:{
            "user": "田川",
            "id": "201883060064",
            "permission": 0
        },
        items: [
            {
                index: 'home',
                title: '管理首页'
            },

            {
                index: '3',
                title: '预留',
            }
        ],

    }
  },
  methods:{
      handleSelect(key, keyPath) {

      },

  },
  created() {

  },
}
</script>

<style>
  .management_page{
    margin-top:80px;
  }
  .management_main{
    margin: 80px auto;
    width: 100%;
    max-width: 1140px;
    padding-top: 5px;
    min-height: 700px;
  }

  .management_main  .el-menu-item:hover {
    color: #409EFF !important;
  }
  .management_main .el-submenu:hover .el-submenu__title, .management_main .el-submenu:focus .el-submenu__title  {
    color: #409EFF !important;
  }

  .management_main .el-menu--horizontal .el-menu .el-menu-item:hover,.management_main .el-menu--horizontal .el-menu .el-submenu__title:hover{
    color: #409EFF !important;
  }
</style>
