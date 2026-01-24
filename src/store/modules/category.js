// 处理navigationBar中的目录数据
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants';
import { getCategory } from '../../api/category';
export default {
  namespaced: true, //独立作用域
  state: () => {
    return {
      // 1.让categorys具备一个初始化数据
      categorys: CATEGORY_NOMAR_DATA //这样每次刷新都不会有卡顿
      // 3.为了防止初始化数据太老，把每次获取到的新数据作为下次初始化数据
      // 3.1 每次从接口得到的数据进行缓存(vuex-persistedstate)类似localstorage，在下次运行时把缓存的数据作为初始值
    };
  },
  mutations: {
    // 为categorys赋值
    setCategorys(state, val) {
      state.categorys = [ALL_CATEGORY_ITEM, ...val];
    }
  },
  actions: {
    // 获取category数据，并赋值给categorys，保存到vuex中
    async useCategoryData(context) {
      // 必须用category解构
      //2.从服务端获取数据，替换初始化数据
      const { categorys } = await getCategory();
      context.commit('setCategorys', categorys);
    }
  }
};
