// 跟用户相关的store
import { message } from '@/libs';
import md5 from 'md5';
import { getProfile, loginUser } from '../../api/sys';
export default {
  namespaced: true,
  state: () => ({
    // token
    token: '',
    // 用户信息
    userInfo: {}
  }),
  mutations: {
    // 保存token
    setToken(state, newToken) {
      state.token = newToken;
    },
    // 保存用户信息
    setUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    }
  },
  actions: {
    // 登录
    async login(context, payload) {
      const { password } = payload;
      const data = await loginUser({
        ...payload,
        // 密码需要md5进行加密
        password: password ? md5(password) : ''
      });
      // console.log(data);
      // 保存token
      context.commit('setToken', data.token);
      // 获取用户信息
      context.dispatch('profile');
    },

    // 登录成功后获取用户信息
    async profile(context) {
      const data = await getProfile();
      // console.log(data);
      context.commit('setUserInfo', data);
      // 提示
      message(
        `登录成功,欢迎您 ${
          data.vipLevel ? '尊贵的VIP' + data.vipLevel + '用户' + data.nickname : data.nickname
        }`,
        'success'
      );
    },

    // 退出登录
    logout(context) {
      // 1.清空token
      context.commit('setToken', '');
      // 2.清空用户信息
      context.commit('setUserInfo', {});
      // 3.刷新页面
      location.reload();
    }
  }
};
