<template>
  <div>
    <div class="main-nav">
      <el-input
        style="width: 500px!important;"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="input">
      </el-input>

      <div class="nav-group__title searchParam">

        <ul class="pure-menu-list" >
          <template v-for="chapter in handleData()">
            <li class="nav-item"><a :href="'#/theory/exam?id='+chapter.test_index" >{{chapter.test_name}}</a></li>
          </template>
        </ul>

      </div>

      <el-pagination
        class="_self"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper, sizes"
        :total="total">
      </el-pagination>

    </div>
  </div>
</template>

<script>

    import {api} from "@/api/ajax"
    export default {
        //活动中心的父级组件
        name: 'theory_page',
        data() {
            return {
                input:'',
                currentPage: 1,
                pageSize: 10,
                total:0,
                remote_data: [
                    {
                        "test_index": 1,
                        "test_name": "裁判理论知识考试"
                    },
                    {
                        "test_index": 2,
                        "test_name": "基础体育知识考试"
                    },
                    {
                        "test_index": 3,
                        "test_name": "羽毛球理论考试"
                    },
                    {
                        "test_index": 4,
                        "test_name": "兵乓球理论考试"
                    },
                    {
                        "test_index": 5,
                        "test_name": "排球理论考试"
                    },

                ],
            }
        },
        methods: {

            //处理表格数据
            handleData(){
                let temp_data = this.remote_data.filter(data=>this.filter(data));
                this.total=temp_data.length;
                return temp_data.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
            },

            //搜索筛选
            filter(val){
                return (!this.input || val.test_name.toLowerCase().includes(this.input.toLowerCase()));
            },


            //每页条数
            handleSizeChange(val) {
                this.pageSize=val;
                /*console.log(`每页 ${val} 条`);*/
            },

            //当前页数
            handleCurrentChange(val) {
                /*console.log(`当前页: ${val}`);*/
            },

        },
        mounted() {

        },
        created() {

        },
    }
</script>

<style scoped>
  .main-nav ul {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  .main-nav {
    padding: 0;
    height: 100%;
    width: 100%;
    margin-left: 30px;
    overflow: hidden;

  }
  .main-nav .nav-item a {
    text-decoration: none;
    display: block;
    color: #444;
    line-height: 40px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 300;
    transition:0.15s ease-out;
  }
  .main-nav .nav-item a:hover {
    color: #409EFF;
  }
  .main-nav .nav-group__title {
    font-size: 16px;
    color: #333;
    line-height: 26px;
    margin-top: 15px;
  }
  .pure-menu-list .nav-item{
    display: block;
  }

</style>
