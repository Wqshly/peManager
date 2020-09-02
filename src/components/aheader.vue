<template>
  <div class="all">
    <div class="normal">
      <div class="activity_header">
        <img class="img_normal" src="../assets/logo2.png"  alt="PE">

        <i class="el-icon-s-fold" @click="drawer = !drawer" :class="{'active2': drawer === true }" ></i>

        <div class="header_a" v-for="item in reverse_headers" @click="jump(item.link)" :class="{'active':isActive === item.link }"  >
          <p>{{item.name}}</p>
        </div>


      </div>
    </div>

    <div class="phone" v-if="drawer">

      <div class="header_phone_a" v-for="item in headers" @click="jump(item.link)" :class="{'active':isActive === item.link }"  >
          <p>{{item.name}}</p>
      </div>

    </div>

  </div>
</template>

<script>
import {clone} from '@/api/clone.js'
export default {
    name: 'aheader',
    data () {
      return {
          message_count:12,
          isActive:'activity',
          reverse_headers:[],
          headers:[

          ],
          drawer: false,
          direction: 'rtl',
          user_name:'田川',
          user_school:'山东科技大学',
          options:['/activity',"/video"]
      }
    },
    methods:{
        jump(val){
            this.drawer=false;
            if(('/'+val) !==this.$route.path){
                this.isActive = val;
                window.location.href="#/"+val;
                window.scrollTo(0, 0);
            }
        },
        account(){
            window.location.href="#/account";
        },
        message(){
            window.location.href="#/account/message";
        },
    },
    mounted(){

    },
    created() {
        this.reverse_headers = clone.deepClone(this.headers).reverse();
        this.isActive = (this.$route.path).split('/')[1];
    }
}
</script>

<style scoped>

  .all .normal{
    width: 100%;
    height: 80px;
    position: fixed;
    top:0;
    z-index: 1999;
    background-color: white;
    border-bottom: 1px solid #dcdfe6;
  }
  .activity_header{
    height: 80px;
    line-height: 80px;
    top:0;
    margin: 0 auto;
    width: 100%;
    max-width: 1140px;
    vertical-align:middle;
  }
  .activity_header .img_normal{
    line-height:80px;
    height: 30px;
    margin:25px 0;
    float: left;
  }

  .activity_header .el-icon-s-fold{
    margin:0 5px;
    font-size:30px;
    vertical-align:middle;
    float: right;
    line-height: 80px;
    cursor: pointer;
    display: none;
  }
  .activity_header .el-icon-bell{
    font-size:25px;
    vertical-align:middle;
    float: right;
    line-height: 80px;
    cursor: pointer;
  }
  .activity_header .el-icon-bell:hover{
    color:#409EFF;
  }
  .activity_header .bell-value{
    margin:0;
    float: right;
  }
  .activity_header .el-icon-s-custom{
    margin:0 5px 0 50px;
    font-size:30px;
    vertical-align:middle;
    float: right;
    line-height: 80px;
    cursor: pointer;
  }

  .normal .el-icon-s-fold:hover{
    color:#409EFF;
    transition: 0.5s;
  }
  .normal .el-icon-s-custom:hover{
    color:#409EFF;
    transition: 0.5s;
  }
  .normal .activity_header .header_a{
    line-height: 80px;
    float: right;
    width: 76px;
    color: #60606d;
    transition: 0.5s;
    cursor: pointer;
    text-align: center;
  }

  .normal .activity_header .header_a:hover{
    color:#409EFF;
  }

  .active{
    border-bottom: 2px solid #409EFF;
    color:#409EFF!important;
  }
  .active3{
    border-bottom: none;
    color:#409EFF!important;
  }
  /*手机端*/
  @media screen and (max-width: 760px){
    .all .normal{
      border-bottom: none!important;
    }

    .activity_header .img_normal{
      display: none;
    }
    .bell{
      display: none;
    }

    .active{
      border-bottom: none;
      color:#409EFF!important;
    }
    .normal .activity_header .header_a{
      display: none;
    }

    .all .phone{
      height: auto!important;
    }
    .all .normal{
      background-color: #1B1C20!important;
    }
    .activity_header .el-icon-s-fold{
      display: inherit!important;
      color: white;
      float: left;;
    }
    .activity_header .el-icon-s-custom{
      color: white;
    }
  }
  .active2{
    color:#409EFF!important;
  }
  .phone{
    width: 100%;
    z-index: 9999;
    position: fixed;;
    top:80px;
    overflow: hidden;
    color: #60606d;
    line-height: 50px;
    height: 0;
    background-color: #1B1C20;
  }
  .header_phone_a{
    width: 100%;
    cursor: pointer;
    transition: background-color 0.5s,color 0.5s;
  }

  .header_phone_a:hover{
    background-color: #60606d;
    color:#409EFF!important;
  }

  .header_phone_a p{
      margin-left: 82px;
  }
</style>
