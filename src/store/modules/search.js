export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      historys: []
    };
  },
  mutations: {
    // 新增
    addHistory(state, newHistory) {
      const isFindIndex = state.historys.findIndex((item) => item === newHistory);
      // 如果已经有了，就要剔除后新增
      if (isFindIndex !== -1) {
        state.historys.splice(isFindIndex, 1);
      }
      // 新增记录(加在最前面)
      state.historys.unshift(newHistory);
    },

    // 单个删除
    deleteHistory(state, index) {
      state.historys.splice(index, 1);
    },

    // 全部删除
    deleteAllHistory(state) {
      state.historys = [];
    }
  }
};
