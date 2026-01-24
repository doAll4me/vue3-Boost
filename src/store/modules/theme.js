import { THEME_LIGHT } from '../../constants';

export default {
  namespaced: true,
  state: () => ({
    // 当前主题模式
    themeType: THEME_LIGHT
  }),
  mutations: {
    changeTheme(state, newTheme) {
      state.themeType = newTheme;
    }
  }
};
