import { ALL_CATEGORY_ITEM } from '../../constants';
// app模块中的数据不会被缓存
export default {
  namespaced: true,
  state: () => ({
    // 当前选中分类(默认为全部)
    currentCategory: ALL_CATEGORY_ITEM,
    // 搜索文本
    searchText: '',
    // 路由跳转类型
    routerType:'none'
  }),
  mutations: {
    // 切换选中分类
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory;
      // console.log(state.currentCategory);
    },
    // 更新搜索文本
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText;
    },
    // 修改routerType
    changeRouterType(state,newRouterType){
      state.routerType=newRouterType
    }
  },
  actions: {}
};
