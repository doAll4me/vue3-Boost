import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import getters from './getters';
import category from './modules/category';
import theme from './modules/theme';
const store = createStore({
  getters,
  modules: {
    category,
    theme
  },
  plugins: [
    createPersistedState({
      // 指定保存到localstorage中的key（名字
      key: 'imooc-front',
      // 需要保存的模块
      path: ['category', 'theme']
    })
  ]
});

export default store;
