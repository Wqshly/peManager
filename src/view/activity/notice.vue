<template>
  <div class="activity-notice">
    <div class="block" v-show="!detail">
      <template>
        <el-table
          :data="handleData()"
          style="width: 100%"
          @cell-click="handleClick"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="description"
            label="通告">
            <template #header >
              <label>
                <input
                  type="text"
                  v-model="search"
                  prefix-icon="el-icon-search"
                  style="width: 150px;"
                  placeholder="输入关键字搜索"

                />
              </label>
            </template>
            <template slot-scope="scope">
              <span style="color: #e95f13;">{{ scope.row.title }}<br/></span>
              <span style="margin-left: 10px">{{ filter_description(scope.row.description)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="发布者"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="发布日期"
            width="100">

          </el-table-column>
        </el-table>
      </template>
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

    <el-card shadow="hover" class="notice_detail" v-show="detail">
      <el-page-header @back="goBack">
        <template slot="content" ><h1>{{detail_item.title}}</h1></template>
      </el-page-header>
      <detail_notice :detail_item="detail_item"></detail_notice>
    </el-card>
  </div>
</template>

<script>
    import detail_notice from '@/view/activity/detail_notice.vue'
    export default {
        components:{
           detail_notice
        },
        name: 'activity-notice',
        data () {
            return {
                detail:false,
                search: '',
                currentPage: 1,
                pageSize: 10,
                total:0,
                tableData: [
                    {
                    title:'通知1',
                    date: '2016-05-02',
                    name: '王小虎',
                    description: '上海市普陀区金沙江路 1518 弄',
                  },
                ],
                tableData_copy: [{
                    title:'通知1',
                    date: '2016-05-02',
                    name: '王小虎',
                    description: '上海市普陀区金沙江路 1518 弄',
                }, {
                    title:'通知2',
                    date: '2016-05-04',
                    name: '王小虎',
                    description: '上海市普陀区金沙江路 1518 弄'
                }, {
                    title:'通知3',
                    date: '2016-05-01',
                    name: '王小虎',
                    description: '上海市普陀区金沙江路 1518 弄',
                }, {
                    title:'通知4',
                    date: '2016-05-03',
                    name: '王小虎',
                    description: '上海市普陀区金沙江路 1518 弄'
                }, {
                    title:'通知5',
                    date: '2016-05-03',
                    name: '王小虎',
                    description: '上海市普陀区金沙江路 1518 弄'
                }, {
                    title:'通知6',
                    date: '2016-05-03',
                    name: '王小虎',
                    description: '上海市普陀区金沙江路 1518 弄'
                }, {
                    title:'通知7',
                    date: '2016-05-03',
                    name: '王小虎',
                    description: '上海市普陀区金沙江路 1518 弄'
                }, {
                    title:'通知8',
                    date: '2016-05-03',
                    name: '王小虎',

                    description: '上海市普陀区金沙江路 1518 弄'
                }, {
                    title:'通知9',
                    date: '2016-05-03',
                    name: '王小虎',
                    description: '上海市普陀区金沙江路 1518 弄'
                }],
                detail_item:{
                    title:'',
                    date: '',
                    name: '',
                    description: ''
                },
            }
        },

        methods: {
            //渲染单行内容
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },

            //处理显示数据
            handleData(){
                let temp_data = this.tableData.filter(data=>this.filter(data));
                this.total=temp_data.length;
                return temp_data.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
            },

            //搜索筛选
            filter(val){
                return (!this.search || val.title.toLowerCase().includes(this.search.toLowerCase()));
            },

            //过滤过长内容
            filter_description(val){
                if(val.length>30){
                    return val.slice(0,30)+'...';
                }
                else{
                    return val;
                }
            },

            //表格点击事件
            handleClick(val) {
                window.scrollTo(0,0);
                this.detail=true;
                this.detail_item=val;
            },

            //每页大小
            handleSizeChange(val) {
                this.pageSize=val;
                /*console.log(`每页 ${val} 条`);*/
            },

            //当前页数
            handleCurrentChange(val) {
                /*console.log(`当前页: ${val}`);*/
            },

            //返回
            goBack() {
                this.detail=false;
            },

        },
        mounted() {
            this.tableData=this.tableData_copy;
            this.total=this.tableData.length;
        }
    }
</script>

<style scoped>
  .activity-notice{
    width: 100%;
  }

  .activity-notice .notice_detail{
    background-color: white;
    height: 100%;
    border:3px solid #ebebeb;
    padding: 20px;
  }

  @media screen and (min-width: 1140px){
    .activity-notice .notice_detail {
      width: 1090px;
      margin: 0 auto;
    }
    .activity-notice  ._self{
      width: 1127px!important;
      margin: 0 auto;
    }
  }
  .activity-notice  ._self{
    position:fixed;
    width: 100%;
    bottom: 0;
    background-color: white;
  }


  .activity-notice h1{
    font-weight: 300;
  }

</style>
