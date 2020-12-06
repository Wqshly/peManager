<template>
  <div class="venue-table-container">
    <h3 style="font-weight: 300;padding-bottom: 10px">管理运动馆{{id}}</h3>

    设置闭馆日:
    <el-date-picker
      v-model="time"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>

    <div class="table">
      <el-table
        :data="handleData()"
        style="width: fit-content;padding-right: 30px"
        stripe>
        <el-table-column
          fixed="left"
          prop="name"
          label="场地编号"
          width="140">
          <template #header>
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
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
          width="100">
        </el-table-column>

        <el-table-column
          label="操作"
          width="200"
          fixed>
          <div slot-scope="scope" class="option">
            <el-button plain type="primary" icon="el-icon-edit" @click.stop="handleEdit(scope.row)">编辑</el-button>
            <el-button plain type="danger" icon="el-icon-delete" @click.stop="handleDelete(scope.row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </div>


</template>

<script>

  export default {
    props: {
      id: {
        default: -1
      }
    },
    watch: {
      id(val) {
        this.id = val;
      }
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 7,
        total: 0,

        search: '',
        tableData: [
          {
            name: 'A-1',
            status: '使用中',
          }, {
            name: 'A-3',
            status: '使用中',
          }, {
            name: 'A-4',
            status: '使用中',
          }, {
            name: 'A-5',
            status: '使用中',
          },
          {
            name: 'A-1',
            status: '使用中',
          }, {
            name: 'A-3',
            status: '使用中',
          }, {
            name: 'A-4',
            status: '使用中',
          }, {
            name: 'A-5',
            status: '使用中',
          },
          {
            name: 'A-1',
            status: '使用中',
          }, {
            name: 'A-3',
            status: '使用中',
          }, {
            name: 'A-4',
            status: '使用中',
          }, {
            name: 'A-5',
            status: '使用中',
          }
        ]
      }
    },

    methods: {
      //每页条数
      handleSizeChangeTemp(val) {
        this.pageSize_temp = val;

      },
      //当前页数
      handleCurrentChangeTemp(val) {

      },

      //处理显示数据
      handleData() {
        let temp_data = this.tableData.filter(data => this.filter(data));
        this.total = temp_data.length;
        return temp_data.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      },

      //搜索筛选
      filter(val) {
        return (!this.search || val.name.toLowerCase().includes(this.search.toLowerCase()));
      },

      handleEdit(row) {
        console.log(row)
      },
      handleDelete(row) {
        console.log(row)
      }
    },

    mounted() {

    },

    created() {

    },

  }
</script>

<style scoped>

  .venue-table-container {
    width: fit-content;
    margin-left: 30px;
  }

  .table {
    max-width: 1000px;
    padding-bottom: 30px;
    background-color: transparent;
  }

  .option {
    display: flex;
    flex-wrap: wrap;
  }

  .option button {
    margin: 0 !important;
  }
</style>
