// 引入 vue
import Vue from 'vue';
// 引入 vuex
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user-info'))
  },
  mutations: {
    updateUser (state, newData) {
      // 更新用户信息
      Object.assign(state.user, newData);
      // 保存到本地中
      window.localStorage.setItem('user-info', JSON.stringify(state.user));
    }
  }
});
