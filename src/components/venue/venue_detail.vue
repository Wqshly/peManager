<template>
  <div class="venue-detail-container">
    <div class="row">
      <el-button plain type="primary" icon="el-icon-arrow-left" @click="$emit('back')">返回</el-button>
    </div>

    <div class="row">
      <div class="item_left">
        <carousel v-if="items1.length !==0" :data="items1"/>
      </div>
      <div class="item_right">
        <div class="inner">
          <span class="font">场馆名：{{ remoteData.name }}</span>
          <span class="font">地点：{{ remoteData.position }}</span>
          <span class="font">简介：{{ remoteData.description }}</span>
          <span class="font">联系人：{{ remoteData.description }}</span>
          <span class="font">联系方式：{{ remoteData.description }}</span>
          <span class="font">开放时间：{{ remoteData.description }}</span>
          <span class="font">其他描述：{{ remoteData.others }}</span>
        </div>
      </div>

    </div>

    <div class="row">
      <el-tabs @tab-click="handleClick"
               type="border-card"
               style="width:80%">
        <el-tab-pane v-for="item in remoteData.subs"
                     :key="item"
                     :label="item.name">
          <div style="width: 100%">
            <carousel v-if="items1.length !== 0" :type="'card'" :data="items1" style="width: 100%;"/>
            <div class="inner2">
              <span class="font">场地规模：{{ remoteData.name }}</span>
              <span class="font">总场地数：{{ remoteData.position }}</span>
              <span class="font">占地：{{ remoteData.description }}</span>
              <span class="font">修建时间：{{ remoteData.description }}</span>
              <span class="font">其他：{{ remoteData.description }}</span>
            </div>
            <div class="row">
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-button type="primary" plain @click="query(item.name)">查询可预约时间</el-button>
            </div>


            <div class="inner2">
              <p v-if="!isQueryed">选择时间段查询场地</p>
              <div v-else>
                <el-tag
                  style="margin-right: 10px"
                  v-for="item in ['A-1','A-3']"
                  :key="item"
                  effect="dark">
                  {{ item }}
                </el-tag>
                <div style="width:100%;padding-top: 20px"><el-button type="success" plain @click="open">我要预约</el-button></div>
              </div>
            </div>

          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" :width="'550px'">
      <el-form :model="dialogForm" label-position="left" label-width="100px">

        <el-form-item label="场馆名">
          {{dialogForm.venueName}}
        </el-form-item>

        <el-form-item label="运动馆">
          {{dialogForm.areaName}}
        </el-form-item>

        <el-form-item label="可预约场地">
          <el-tag
            style="margin-right: 10px;cursor: pointer"
            v-for="item in ['A-1','A-3']"
            :key="item"
            @click.stop="chooseArea(item)"
            :effect="mappingEffect(item)">
            {{ item }}
          </el-tag>
        </el-form-item>

        <el-form-item label="预约时段">
          <el-date-picker
            v-model="dialogForm.time"
            disabled
            type="datetimerange"
            range-separator="至"
            start-placeholder="预约时间"
            end-placeholder="预计结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="联系人">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="dialogForm.method" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>

<script>
  import carousel from "../common/carousel";

  export default {
    components: {
      carousel,
    },
    data() {
      return {
        isQueryed: false,
        //现在 至 两小时后
        value1: [new Date(), new Date().setTime(new Date().getTime() + 3600 * 1000 * 2 )],
        /*轮播图 走马灯*/
        items1: [
          {
            name: "1",
            url: "http://www.xiaoyuanpe.com/1.png"
          },
          {
            name: "2",
            url: "http://www.xiaoyuanpe.com/2.png"
          },
          {
            name: "3",
            url: "http://www.xiaoyuanpe.com/3.png"
          },
        ],
        dialogFormVisible: false,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        remoteData: {
          name: '',
          position: '',
          description: '',
          others: '',
          subs: [
            {
              name: '足球',
              startTime: '',
              endTime: '',
            },
            {
              name: '篮球',
              startTime: '',
              endTime: '',
            },

          ],
        },

        dialogForm: {
          venueName: '',
          areaName: '',
          name: '1',
          method: '88888888',
          area: [],
          time: [],
        }

      }
    },
    methods: {
      open() {
        this.dialogForm.time = this.value1;
        this.dialogForm.venueName = '山科大东馆';
        this.dialogForm.name = this.$store.state.user.username;
        this.dialogFormVisible = true;
      },
      query(val) {
        this.isQueryed = true;
        this.dialogForm.areaName = val;
      },
      handleClick(tab, event) {
        this.isQueryed = false;
        this.dialogForm.areaName = tab.label;
      },

      chooseArea(val){
        let findIndex = this.dialogForm.area.findIndex(e => {
          if(e === val) {
            return true
          }
        });

        if(findIndex >= 0 ) {
          this.dialogForm.area.splice(findIndex, 1);
        } else {
          this.dialogForm.area.push(val);
        }
      },

      mappingEffect(val){
        for(let i = 0; i < this.dialogForm.area.length; ++i){
          if(this.dialogForm.area[i] === val) {
            return "dark";
          }
        }
      }
    },
    mounted() {

    },
    created() {

    },
    watch: {
      value1(val){
        this.isQueryed = false;
      }
    }
  }
</script>

<style scoped>

  .venue-detail-container {
    width: 100%;
    padding-left: 30px;
    background-color: #f2f5f6;
    padding-top: 30px;
  }

  .row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 30px;
  }

  .item_left {
    width: 60%;
  }

  .item_right {
    width: fit-content;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
  }

  .item_right .inner{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-bottom: 30px;
  }

  .inner .font {
    color: grey;
    margin: 9px;
  }

  .inner2{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    width: 100%;
  }

  .inner2 .font {
    color: grey;
    margin: 9px;
    width: 40%;
  }
</style>
