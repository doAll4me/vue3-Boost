import { PC_DEVICE_WIDTH } from "@/constants";
import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

// 判断当前设备是否为移动端设备
// 依据：当前屏幕宽度是否小于1280
const { width } = useWindowSize();
export const isMobileTerminal = computed(() => {
  // console.log(width.value);
  return width.value < PC_DEVICE_WIDTH;
});

/* *
 *动态指定 rem基准值， 最大为 40px
 *根据用户的屏幕宽度，进行计算，把结果赋值给html 根标签作为 fontsize 大小
 */
export const useRem = () => {
  // 定义最大值
  const MAX_FONT_SIZE = 40;
  //监听 html 文档被解析完成(DOMContentLoaded)的事件
  document.addEventListener("DOMContentLoaded", () => {
    // html标签
    const html = document.querySelector("html");
    // 计算fontSize( 根据屏幕宽度/10 得到fintsize)
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
    // 赋值给html
    html.style.fontSize = fontSize + "px";
  });
};
