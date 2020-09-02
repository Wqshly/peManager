import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


const managementPage = () => Promise.resolve(require('@/components/managementPage'));

/*login page*/
const login = () => Promise.resolve(require('@/view/login'));

/*management page*/
const mana_page = () => Promise.resolve(require('@/view/management/manaPage'));
const mana_class = () => Promise.resolve(require('@/view/management/manaClassPage'));

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },

    {
      path: '/management',
      component: managementPage,
      children: [
        {
          path: '/',
          redirect:'/management/home',
        },
        {
          path: '/management/home',
          component: mana_page
        },
        {
          path: '/management/class',
          component: mana_class
        },

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
