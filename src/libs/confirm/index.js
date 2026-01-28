import { h, render } from 'vue';
import confirmComponent from './index.vue';
/**
 * 展示confirm，若用户只传递一个参数，则这个参数会被作为content
 * @param {*} title 标题（如果用户没传递内容，则标题充当内容
 * @param {*} content 内容（如果没有title，content会被作为第一个参数传入
 * @param {*} cancelText 取消按钮的文本
 * @param {*} confirmText 确定按钮的文本
 */
export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title;
      title = '';
    }

    // 三个事件
    // 关闭的回调
    const close = () => {
      // 3.利用render把渲染的vnode销毁
      render(null, document.body);
    };
    // 取消按钮的回调
    const cancelHandler = () => {
      reject(new Error('取消按钮点击'));
    };
    // 确定按钮的回调
    const confirmHandler = () => {
      resolve();
    };

    // 1.生成vnode
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    });

    // 2.通过render函数渲染vnode
    render(vnode, document.body);
  });
};
