import { message } from '@/libs';
import router from '@/router';
import store from '@/store';
// 控制用户页面访问权限
// 监听router页面跳转（路由守卫
router.beforeEach((to, from) => {
  // 无需登录即可访问的页面
  if (!to.meta.user) {
    return;
  }
  // 需要登录才能访问的页面
  // 已登录
  if (store.getters.token) {
    return true;
  }
  //还未登录
  message('登录失效，请重新登录', 'warn');
  return '/';
});
