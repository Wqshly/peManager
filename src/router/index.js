import Router from 'vue-router'

/*骨架页面无下划线*/

/*门户*/
const indexPage = () => import(/* webpackChunkName: '0' */ '../view/index/Page');
const index_home = () => import(/* webpackChunkName: '0' */ '../view/index/home');
const index_venue = () => import(/* webpackChunkName: '0' */ '../view/index/venue');
const index_equipment = () => import(/* webpackChunkName: '0' */ '../view/index/equipment');
const index_function = () => import(/* webpackChunkName: '0' */ '../view/index/function');
const index_app = () => import(/* webpackChunkName: '0' */ '../view/index/app1');
const notFoundPage = () => import(/* webpackChunkName: '0' */ '../view/404');

/*login page*/
const login = () => import(/* webpackChunkName: '0' */ '../view/login');

/*首页*/
const homePage = () => import(/* webpackChunkName: '0' */ '../view/home/Page');
const home_page = () => import(/* webpackChunkName: '0' */ '../view/home/home');

/*早操*/
const exercisesPage = () => import(/* webpackChunkName: '1' */ '../view/exercises/Page');
const exercises_page = () => import(/* webpackChunkName: '1' */ '../view/exercises/home');

/*home2 page*/
const home2Page = () => import(/* webpackChunkName: '2' */ '../view/home2/Page');
const home2_page = () => import(/* webpackChunkName: '2' */ '../view/home2/home');



/*promotion page*/
const promotionPage = () => import(/* webpackChunkName: '4' */ '../view/promotion/Page');
const promotion_home = () => import(/* webpackChunkName: '4' */ '../view/promotion/home');

/*activity page*/
const activityPage = () => import(/* webpackChunkName: '5' */ '../view/activity/Page');
const activity_home = () => import(/* webpackChunkName: '5' */ '../view/activity/home');
const activity_notice = () => import(/* webpackChunkName: '5' */ '../view/activity/notice');
const activity_promotional = () => import(/* webpackChunkName: '5' */ '../view/activity/promotional');
const activity_management = () => import(/* webpackChunkName: '5 */ '../view/activity/management');
const activity_check = () => import(/* webpackChunkName: '5' */ '../view/activity/check_in');

/*video page*/
const videoPage = () => import(/* webpackChunkName: '6' */ '../view/video/Page');
const video_home = () => import(/* webpackChunkName: '6' */ '../view/video/home');
const video_video= () => import(/* webpackChunkName: '6' */ '../view/video/video');
const video_class= () => import(/* webpackChunkName: '6' */ '../view/video/class');

/*account page*/
const accountPage = () => import(/* webpackChunkName: '7' */ '../view/account/Page');
const account_profile = () => import(/* webpackChunkName: '7' */ '../view/account/accountProfile');
const account_message = () => import(/* webpackChunkName: '7' */ '../view/account/accountMessage');
const account_account = () => import(/* webpackChunkName: '7' */ '../view/account/accountAccount');
const account_security= () => import(/* webpackChunkName: '7' */ '../view/account/accountSecurity');
const account_management = () => import(/* webpackChunkName: '7' */ '../view/account/accountManagement');
const account_privacy = () => import(/* webpackChunkName: '7' */ '../view/account/accountPrivacy');
const account_logout = () => import(/* webpackChunkName: '7' */ '../view/account/logout');

/*health page*/
const healthPage = () => import(/* webpackChunkName: '10' */ '../view/health/Page');
const health_home = () => import(/* webpackChunkName: '10' */ '../view/health/home');
const health_anti = () => import(/* webpackChunkName: '10' */ '../view/health/Anti-Acne');

/*theory page*/
const theoryPage = () => import(/* webpackChunkName: '11' */ '../view/theory/Page');
const theory_page = () => import(/* webpackChunkName: '11' */ '../view/theory/home');
const theory_theory = () => import(/* webpackChunkName: '11' */ '../view/theory/theoryTheory');
const theory_exam = () => import(/* webpackChunkName: '11' */ '../view/theory/theoryExam');
const theory_exams = () => import(/* webpackChunkName: '11' */ '../view/theory/theoryExams');

/*预约场地*/
const venuePage = () => import(/* webpackChunkName: '12' */ '../view/venue/Page');
const venue_page = () => import(/* webpackChunkName: '12' */ '../view/venue/home');

/*器材租赁*/
const equipmentPage = () => import(/* webpackChunkName: '13' */ '../view/equipment/Page');
const equipment_page = () => import(/* webpackChunkName: '13' */ '../view/equipment/home');

/*management page*/
const managementPage = () => import(/* webpackChunkName: '9' */ '../view/management/Page');
const mana_page = () => import(/* webpackChunkName: '9' */ '../view/management/home');
const mana_class = () => import(/* webpackChunkName: '9' */ '../view/management/manaClass');
const competition_create = () => import(/* webpackChunkName: '3' */ '../view/management/competition/create');
const competition_mana = () => import(/* webpackChunkName: '3' */ '../view/management/competition/management');
const venue_create = () => import(/* webpackChunkName: '3' */ '../view/management/venue/create');
const venue_management = () => import(/* webpackChunkName: '3' */ '../view/management/venue/management');
const venue_sub_add = () => import(/* webpackChunkName: '3' */ '../view/management/venue/addSubVenue');
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/404',
      component: notFoundPage,
    },
    {
      path: '/account',
      component: accountPage,
      children: [
        {
          path: '/',
          redirect:'/account/profile',
        },
        {
          path: '/account/profile',
          component: account_profile
        },
        {
          path: '/account/message',
          component: account_message
        },
        {
          path: '/account/account',
          component: account_account
        },
        {
          path: '/account/security',
          component: account_security
        },
        {
          path: '/account/privacy',
          component: account_privacy
        },
        {
          path: '/account/management',
          component: account_management
        },
        {
          path: '/account/logout',
          component: account_logout
        },
      ]
    },

    {
      path: '/management',
      component: managementPage,
      children: [
        {
          path: '/',
          redirect:'/management/management/home',
        },
        {
          path: '/management/management',
          redirect:'/management/management/home',
        },
        {
          path: '/management/management/home',
          component: mana_page
        },
        {
          path: '/management/management/class',
          component: mana_class
        },

        //管理页面中的本地比赛
        {
          path: '/competition/management',
          redirect:'/competition/management/create',
        },
        {
          path: '/competition/management/create',
          component: competition_create
        },
        {
          path: '/competition/management/management',
          component: competition_mana
        },

        //管理页面中的场馆
        {
          path: '/venue/management',
          redirect:'/venue/management/create',
        },
        {
          path: '/venue/management/create',
          component: venue_create
        },
        {
          path: '/venue/management/management',
          component: venue_management
        },
        {
          path: '/venue/management/addSubVenue',
          component: venue_sub_add
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
});

export default router;
