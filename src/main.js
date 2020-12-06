import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import VueLazyload from 'vue-lazyload'
import icon from "./assets/icon/iconfont.js"

Vue.use(router);
Vue.use(VueLazyload);

import header from './components/header.vue'
import footer from './components/footer.vue'
import menu from './components/routerByMenu.vue'

Vue.component('v-header', header);
Vue.component('v-footer', footer);
Vue.component('router-menu', menu);

Vue.config.productionTip = false;


new Vue({
  el: '#app',
  store,
  router,
  components: {
    App,
  },
  template: '<App></App>'
});


import {clone} from './api/clone.js'
import {api} from './api/ajax'
import {eventBus} from './api/bus'

Vue.prototype.$clone = clone;
Vue.prototype.$api = api;
Vue.prototype.$eventBus = eventBus;

if(store.state.user.id === -1) {
  api.get('/api/login/LoginOrNot').then(res => {
    if (res.code === 0) {
      store.state.user = res.data;
    }
  });
}

router.beforeEach((to, from, next) => {
  if (from.path === '/competition/create') {
    Vue.prototype.$confirm('确认离开页面？')
      .then(_ => {
        next();
      })
      .catch(_ => {
      });
  }
  //if中是需要执行（判断是不是已登录）的条件
  else if (
    store.state.user.id === -1
    && to.path !== '/login'
    && from.path !== '/login'
    && to.path.split('/')[1] !== 'index'
  ) {
    api.get('/api/login/LoginOrNot').then(res => {
      if (res.code === 0) {
        store.state.user = res.data;
        window.scrollTo(0, 0);
        next();
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        });
      }
    });
  } else {
    window.scrollTo(0, 0);
    if (to.path !== from.path) {
      next()
    }
  }

});
