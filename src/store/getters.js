import { isMobileTerminal } from '../utils/flexible';
// 外部供应资源
export default {
  // 简单访问
  categorys: (state) => state.category.categorys,
  themeType: (state) => state.theme.themeType,
  currentCategory: (state) => state.app.currentCategory, //选中目录项
  currentCategoryIndex: (state, getters) => {
    //选中项目录的下标
    // 根据选中项计算index值
    return getters.categorys.findIndex((item) => {
      return item.id === getters.currentCategory.id;
    });
  },
  // 搜索历史
  historys: (state) => state.search.historys,
  // 搜索文本
  searchText: (state) => state.app.searchText,
  // token
  token: (state) => state.user.token,
  // userInfo
  userInfo: (state) => state.user.userInfo,
  // 路由跳转方式
  routerType: (state) => {
    // PC端没有跳转动画
    if (!isMobileTerminal) {
      return 'none';
    }
    return state.app.routerType;
  }
};
