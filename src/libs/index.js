import { defineAsyncComponent } from 'vue';
export { confirm } from './confirm/index';
export { message } from './message/index';

export default {
  install(app) {
    // app.component('m-svg-icon', svgIcon);
    // app.component('m-popup', popup);

    // 组件自动注册
    //1.获取当前路径下所有文件夹中的index.vue(glob是一个异步方法，适用于组件)
    const components = import.meta.glob('./*/index.vue');
    // console.log(components);
    // 2.遍历获取所有组件
    // Object.entries  把对象 components 转成「键值对数组」
    for (const [filePath, fn] of Object.entries(components)) {
      // 3.利用app.component进行注册
      // console.log(item);
      // 利用路径获取组件名，'./popup/index.vue' 先移除./ ，再利用/分为数组，取第一个元素，即popup组件名
      const componentName = 'm-' + filePath.replace('./', '').split('/')[0];
      app.component(componentName, defineAsyncComponent(fn));
    }
  }
};
