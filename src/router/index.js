import Vue from 'vue';
import Router from 'vue-router';
// 引入 nprogress 第三方进度条
import nprogress from 'nprogress';

// 将 vue-router 挂载到 vue 上
Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    component: () => import('@/views/layout'),
    children: [{
      name: 'AppHome',
      path: '',
      component: () => import('@/views/home')
    },
    {
      name: 'AppPublish',
      path: '/publish',
      component: () => import('@/views/publish')
    },
    {
      name: 'ArtcleList',
      path: '/article',
      component: () => import('@/views/articles')
    }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  }
  ]
});

// 路由守卫，前置守卫，检测是否登录
router.beforeEach((to, from, next) => {
  // 开始进度条
  nprogress.start();
  const userInfo = JSON.parse(window.localStorage.getItem('user-info'));
  // 如果不是登录页面
  if (to.path !== '/login') {
    // 判断是否登录
    if (!userInfo) {
      // 如果没有登录则跳转到登录页面
      return next('/login');
    }
    next();
  } else {
    // 如果已经登录了，则不允许继续访问登录页面
    if (userInfo) {
      return next(false);
    }
    next();
  }
});

// 路由导航完成钩子
router.afterEach((to, from) => {
  // 结束进度条
  nprogress.done();
});

export default router;
