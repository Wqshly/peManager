import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import icon from "./assets/icon/iconfont.js"

Vue.use(ElementUI);
Vue.config.productionTip = false;
import {api}  from '@/api/ajax'

const vue = new Vue({
  el: '#app',
  data(){
    return{
      user: {
        id: -1,
        userNumber: "234",
        username: "李四",
        password: "123456",
        age: 22,
        sex: "男",
        unit: "软件2班",
        identity: "学生",
        phone: "09876543211",
        email: "1223qq.com",
        schoolId: "山东科技大学"
      }
    };
  },
  router,
  components: {App},
  template: '<App/>',
  watch: {
    $route(to, from) {
      if(this.$root.user.id === -1 && to.path !== '/login')
      api.get('/api/login/LoginOrNot').then(res => {
        if (res.code === 0) {
          this.$root.user = res.data;
        }
        else{
          this.$router.push('/login');
        }
      })
    },
  },
});


