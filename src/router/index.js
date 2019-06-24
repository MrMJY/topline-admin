import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
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
