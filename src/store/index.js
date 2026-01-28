import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import getters from './getters';
import app from './modules/app';
import category from './modules/category';
import search from './modules/search';
import theme from './modules/theme';
const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search
  },
  plugins: [
    createPersistedState({
      // 指定保存到localstorage中的key（名字
      key: 'imooc-front',
      // 需要保存的模块
      path: ['category', 'theme', 'search']
    })
  ]
});

export default store;
