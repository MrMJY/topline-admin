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
