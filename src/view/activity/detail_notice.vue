<template>
  <div class="detail_notice">
    <div class="detail_notice_date">
    发布者：
    {{detail_item.name}}
    &nbsp;&nbsp;&nbsp;&nbsp;发布日期:
    {{detail_item.date}}
    </div>
    <div class="detail_notice_content">
      {{detail_item.description}}
    </div>

  </div>
</template>

<script>
    export default {
        name: 'activity-promotional',
        props: ["detail_item"],
        data () {
            return {

            };
        },
        methods: {
        },
        watch: {
            detail_item: {
                deep: true,
                handler(nv, ov) {
                    this.detail_item = nv;
                    console.log('监听:');
                    console.log(nv);
                }
            }
        },
    }
</script>

<style>
  .detail_notice{
    margin-top: 20px;
    width: 100%;
  }
  .detail_notice .detail_notice_date{
    font-size: 15px;
    font-weight: 300;
    padding-bottom: 20px;
    border-bottom:1px solid #ebebeb;
  }
  .detail_notice .detail_notice_content{
    margin-top: 20px;
    width:100%;
  }
</style>
