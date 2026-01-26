import { ALL_CATEGORY_ITEM } from '../../constants';
// app模块中的数据不会被缓存
export default {
  namespaced: true,
  state: () => ({
    // 当前选中分类(默认为全部)
    currentCategory: ALL_CATEGORY_ITEM
  }),
  mutations: {
    // 切换选中分类
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory;
      // console.log(state.currentCategory);
    }
  },
  actions: {}
};
