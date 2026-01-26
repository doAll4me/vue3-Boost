// 全局指令

import { useIntersectionObserver } from '@vueuse/core';

// 处理图片懒加载
export default {
  // 图片懒加载：可以看到图片时再加载，看不到的图片不加载
  mounted(el) {
    // el是img标签
    // console.log(el);

    // 1.保存img的src
    const imgSrc = el.src;
    // 2.清空img的src
    el.src = '';
    // 3.监听图片是否在用户视图中(解构出自带的stop函数)
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 4.当图片可见时 就加载图片的src
        el.src = imgSrc;
        // 5.停止监听
        stop();
      }
    });
  }
};
