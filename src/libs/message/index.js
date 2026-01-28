import { h, render } from 'vue';
import messageComponent from './index.vue';
/**
 *展示message
 * @param {*} content message提示文本内容
 * @param {*} type message显示类型（success，warn，error）
 * @param {*} duration 显示持续时间(单位毫秒)，默认3000
 */
export const message = (content, type, duration = 3000) => {
  // 动画结束时的回调函数
  const onDestroy = () => {
    // 3.删除vnode
    render(null, document.body);
  };
  // 1.创建vnode
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destroy: onDestroy
  });

  // 2.渲染vnode
  render(vnode, document.body);
};
