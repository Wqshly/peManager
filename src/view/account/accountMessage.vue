<template>
  <div>
  <div class="message-box">
    <h3>消息</h3>
    <div v-for="message in messages" @click="open(message)" class="message_item">
      <span>{{message.title}}</span>

      <p>&nbsp;&nbsp;&nbsp;&nbsp;{{message.content}}</p>

    </div>

  </div>
  </div>
</template>

<script>


export default {
  //活动中心的父级组件
  name: 'account_profile',
  data () {
    return {
      messages:[
          {
              title:'PE校园',
              content:'这是一条信息1',
          },
          {
              title:'PE校园',
              content:'这是一条信息2',
          },
          {
              title:'PE校园',
              content:'这是一条信息3',
          },
          {
              title:'PE校园',
              content:'这是一条信息4',
          },
          {
              title:'PE校园',
              content:'这是一条信息5',
          },
          {
              title:'PE校园',
              content:'这是一条信息6',
          },
          {
              title:'PE校园',
              content:'这是一条信息7',
          },
          {
              title:'PE校园',
              content:'这是一条信息8',
          },
          {
              title:'PE校园',
              content:'这是一条信息9',
          },
      ],
    }
  },
  components: {

  },
  methods: {
    open(val){
      alert(val.content);
    }
  }
}
</script>

<style scoped>

.message-box{
  width: 90%;
  margin: 0 auto;
}
.message-box h3{
  font-weight: 400!important;
  font-size: 24px!important;
  border-bottom: 1px solid #ddd!important;
}

.message_item{
  width: 90%;
  margin: 5px auto;
  border-radius: 6px;
  border: 1px solid #ddd;
  padding: 25px;
}

.message_item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.message_item span{
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
