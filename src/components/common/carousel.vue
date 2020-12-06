<template>
  <el-carousel :type="type"
               :trigger="trigger"
               :indicator-position="position"
               :interval="interval"
               :height="bannerHeight+'px'">
    <el-carousel-item v-for="item in data" :key="item">
      <p v-if="showName">{{item.name}}</p>
      <div class="item">
        <img ref="bannerHeight"
             :src="item.url"
             class="bannerImg"
             @load="imgLoad"/>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>

  export default {
    props: {
      showName: {
        default: false
      },

      data: {
        default: [
          {
            name: "1",
            url: "http://www.xiaoyuanpe.com/1.png"
          }
        ]
      },
      type: {
        default: ''
      },
      position: {
        default: 'outside'
      },
      trigger: {
        default: 'click'
      },
      interval: {
        default: 5000
      },
    },
    data() {
      return {
        bannerHeight: "",
      };
    },
    methods: {
      imgLoad() {
        this.$nextTick(() => {
          let height = this.showName ? 40 : 0;
          this.bannerHeight = this.$refs.bannerHeight[0].height + height;
        });
      },
      resizeCarousel() {
        let height = this.showName ? 40 : 0;
        this.bannerHeight = this.$refs.bannerHeight[0].height + height;
        this.imgLoad();
      }

    },
    mounted() {
      this.imgLoad();
      window.addEventListener('resize', this.resizeCarousel, false);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeCarousel, false);
    }


  }
</script>

<style scoped>
  .bannerImg {
    width: 100%;
  }

  .item {
    position: relative;
  }

  p {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
    font-weight: 300;
  }
</style>
