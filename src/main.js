import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
// 引入进度条样式
import 'nprogress/nprogress.css';

import '@/styles/index.less';

// 给 axios 设置基础路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0';

// Axios 请求拦截器
// 统一在 header 中添加 token
axios.interceptors.request.use(config => {
  const userInfo = JSON.parse(window.localStorage.getItem('user-info'));
  // 如果登录了才添加 token 防止访问登录页面报错
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Axios 响应拦截器// 身份验证、错误处理
axios.interceptors.response.use(response => {
  return response.data.data;
}, error => {
  const status = error.response.status;
  switch (status) {
    // token 令牌不正确
    case 401:
      // 删除本地错误的 user-info 数据
      window.localStorage.removeItem('user-info');
      // 跳转登录
      router.push({
        name: 'login'
      });
      break;
  }
  return Promise.reject(error);
});

// 将 axios 写入到 Vue 实例的原型中
// 因为所有的组件都是 vue 的实例，可以继承 axios
Vue.prototype.$http = axios;

// 引入 ElementUI 组件库到 Vue 中
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
