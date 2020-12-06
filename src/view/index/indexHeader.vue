<template>
  <div class="index_sidebar">
    <div class="sidebar">
      <div class="d">
        <el-menu mode="horizontal" active-text-color="#fff" unique-opened router
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
            <!--        LOGO-->
            <template v-if="item.index==='equipment'">
              <li>
                <img v-lazy="require('../../assets/logo.png')" alt="">
              </li>
            </template>
          </template>
        </el-menu>
      </div>


    </div>
    <div class="sidebar_phone">
      <div style="height: 60px">
        <img v-lazy="require('../../assets/brand.png')" style="height: 60px" alt="">
        <i class="el-icon-s-fold" @click="drawer = !drawer" style=""></i>
      </div>
      <el-collapse-transition>
        <div v-show="drawer" style="">
          <el-table
            :show-header="false"
            :data="items"
            style="width: 100%;"
            @cell-click="handleClick">
            <el-table-column
              prop="index">
              <template slot-scope="scope">
                <div style="padding-left: 60px">
                  {{scope.row.title}}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-transition>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        screenWidth: '',
        items: [
          {
            index: 'home',
            title: '首页'
          },
          {
            index: 'venue',
            title: '预约场地'
          },
          {
            index: 'equipment',
            title: '器材租赁'
          },
          {
            index: 'function',
            title: '产品功能'
          },
          {
            index: 'app',
            title: 'APP下载'
          },
          {
            index: '/home',
            title: '登录入口'
          },

        ]
      }
    },
    methods: {
      handleSelect(key, keyPath) {

      },

      handleClick(val) {
        this.drawer = false;
        if (('/' + val.index) != this.$route.path) {
          this.$router.push(val.index);
        }
      }
    },
    mounted() {

    },
    created() {
      this.drawer = false;
    }
  }
</script>

<style scoped>

  .index_sidebar {
    margin-bottom: 60px;
  }

  .index_sidebar .sidebar {
    transform: none;
    display: inline;
    width: 100%;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    z-index: 666;
  }

  .index_sidebar .sidebar * {
    border-bottom: none !important;
  }

  .index_sidebar .sidebar .el-menu-item {
    background: transparent none !important;
    border-bottom: none !important;
  }

  .index_sidebar .sidebar .el-menu-item:hover {
    color: #409EFF !important;
  }

  .index_sidebar .sidebar .d ul {
    display: flex;
    justify-content: space-around;
    height: 124px !important;
    margin-bottom: 10px;
  }

  .index_sidebar .sidebar .d ul, .index_sidebar li {
    list-style: none;
    line-height: 124px !important;
    color: white !important;
  }

  /*中间的图标*/
  .index_sidebar .sidebar .d li img {
    margin-top: 35px;
    width: 100px;
    margin-bottom: 10px;
  }


  .index_sidebar .sidebar_phone {
    position: fixed;
    z-index: 99999;
    width: 100%;
    top: 0;
    background-color: black;
    height: 60px;
  }

  /*左上角图标*/
  .index_sidebar .sidebar_phone .el-icon-s-fold:hover {
    color: #409EFF;
    margin-right: 15px;
    font-size: 30px;
    vertical-align: middle;
    float: right;
    line-height: 60px
  }

  .index_sidebar .sidebar_phone .el-icon-s-fold {
    color: white;
    margin-right: 15px;
    font-size: 30px;
    vertical-align: middle;
    float: right;
    line-height: 60px;
    cursor: pointer;
  }

  /*下拉*/
  .index_sidebar .sidebar_phone .el-table--enable-row-hover .el-table__body tr:hover > td {
    background: black;
    color: #409EFF !important;
  }

  .index_sidebar .sidebar_phone .el-table__row > td {
    border: none;
    background: black;
    color: white;
  }

  .index_sidebar .sidebar_phone .el-table::before {
    height: 0;
  }


  /*自适应*/
  .index_sidebar .sidebar_phone {
    display: inherit;
  }

  .index_sidebar .sidebar {
    display: none;
  }

  @media (min-width: 760px) {
    .index_sidebar .sidebar_phone {
      display: none;
    }

    .index_sidebar .sidebar {
      display: inherit;
    }

    .index_sidebar {
      margin-bottom: 0;
    }
  }

  .index_sidebar .el-table__row {
    cursor: pointer;
  }
</style>
