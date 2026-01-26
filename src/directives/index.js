// import lazy from './modules/lazy';

// 统一全局注册指令
export default {
  install(app) {
    // app.directive('lazy', lazy);

    // 指令自动注册
    //1.获取modules下所有的js文件
    // vite3.x已经没有globEager方法了,改为第二个参数 { eager: true }
    const directives = import.meta.glob('./modules/*.js', { eager: true });
    // console.log(directives);
    // 2.遍历获取所有组件
    // Object.entries  把对象 directives 转成可枚举的数组
    for (const [key, value] of Object.entries(directives)) {
      // 3.利用app.directive进行注册
      // 利用路径获取组件名   ./modules/lazy.js
      const arr = key.split('/');
      const name = arr[arr.length - 1].replace('.js', '');
      app.directive(name, value.default);
    }
  }
};
