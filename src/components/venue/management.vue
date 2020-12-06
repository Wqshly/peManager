<template>
  <div id="venue-management">
    <div class="venue-management-container">
      <div class="venue">
        <el-input type="text"
                  v-model="search"
                  prefix-icon="el-icon-search"
                  class="button1"
                  placeholder="输入场馆名搜索">
        </el-input>
        <div class="venue-content">
          <div v-for="venue in handleVenue()"
               @click="handleClick(venue)"
               :class="{'active' : venue === chooseVenue.id}">
            <p>{{venue}}</p>
          </div>
        </div>
      </div>


      <div class="subvenue">
        <el-input type="text"
                  v-model="search2"
                  prefix-icon="el-icon-search"
                  class="button1"
                  placeholder="输入运动馆名搜索">
        </el-input>
        <div class="venue-content" v-if="chooseVenue.id !== -1">
          <div v-for="venue in handleSubVenue()"
               @click="handleClick2(venue)"
               :class="{'active' : venue === chooseSubVenue.id}">
            <p>{{venue}}</p>
          </div>
        </div>
      </div>

    </div>

    <div class="venue-management-edit venue-content">
      <div style="margin-right: 30px">
        <edit-venue v-if="choose ==='venue'"
                    :id="chooseVenue.id"/>
        <edit-sub-venue v-if="choose ==='subvenue'"
                        :id="chooseSubVenue.id"
                        :venueId="chooseVenue.id"/>
        <div class="message" v-if="choose ===''"><h3>选择场馆或运动馆进行管理</h3></div>
      </div>
    </div>

    <div>
      <mana-sub-venue v-if="choose ==='subvenue'"
                      :id="chooseSubVenue.id"
                      :venueId="chooseSubVenue.id"/>

    </div>

  </div>
</template>

<script>

  import editVenue from "./editVenue";
  import editSubVenue from "./editSubVenue";
  import manaVenue from "./manaVenue";
  import manaSubVenue from "./manaSubVenue";

  export default {
    components: {
      editVenue,
      editSubVenue,
      manaVenue,
      manaSubVenue
    },
    data() {
      return {
        search: '',
        search2: '',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        venues: [],
        subvenues: [],
        choose: "",
        chooseVenue: {
          id: -1
        },
        chooseSubVenue: {
          id: -1,
        }
      }
    },
    methods: {
      handleClick(venue) {
        this.choose = "venue";
        this.chooseVenue = {
          id: venue
        };
        this.chooseSubVenue = {
          id: -1,
        }
      },

      handleClick2(subvenue) {
        this.choose = "subvenue";
        this.chooseSubVenue = {
          id: subvenue
        }
      },

      handleVenue() {
        return this.venues.filter(data => this.filter(data, this.search));
      },

      handleSubVenue() {
        return this.subvenues.filter(data => this.filter(data, this.search2));
      },

      //搜索筛选
      filter(val, search) {
        return (!search || val.toLowerCase().includes(search.toLowerCase()));
      },


    },

    mounted() {
      for (let i = 0; i < 40; ++i) {
        this.venues.push(i + '');
        this.subvenues.push(i * 100 + i + '');
      }
    },

  }
</script>

<style scoped>
  #venue-management {
    width: 100%;
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .venue-management-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    border-bottom: #ededed 1px solid;
  }

  .venue {
    position: relative;
    width: fit-content;
  }

  .button1 {
    position: absolute;
    top: 0;
  }

  .venue-content {
    margin-top: 40px;
    min-width: 150px;
    width: fit-content;
    max-height: 600px;
    position: relative;
    overflow: scroll;
  }

  .venue-content p {
    font-size: 18px;
    font-weight: 300;
    padding: 10px;
    color: black;
  }

  .venue-content .active {
    background-color: #409EFF;
  }

  .venue-content p:hover {
    background-color: #409EFF;
  }

  .venue-content::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .venue-content::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #b1b1b1;
  }

  .venue-content::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 10px;
    background: #ededed;
  }

  .subvenue {
    position: relative;
    width: fit-content;
    min-width: 150px;
    border-right: #ededed 2px solid;
  }

  .venue-management-edit {
    margin-top: 0 !important;
    min-width: 660px !important;
    width: fit-content;
    max-height: 640px;
    position: relative;
    overflow: scroll;
  }

  .message {
    height: 400px;
    width: 660px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .message h3 {
    font-size: 30px;
    font-weight: 400;
  }
</style>
