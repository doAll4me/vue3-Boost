<template>
  <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div ref="referenceTarget">
      <!-- 具名插槽：触发弹层的位置 -->
      <slot name="reference"></slot>
    </div>

    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisible"
        class="absolute p-1 z-20 bg-white border rounded-md"
        :style="contentStyle"
      >
        <!-- 匿名插槽：弹出层的展示内容 -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
// 1.指定所有可选位置的常量，并生成enum
// 左上
const PROP_TOP_LEFT = 'top-left';
// 右上
const PROP_TOP_RIGHT = 'top-right';
// 左下
const PROP_BOTTOM_LEFT = 'bottom-left';
// 右下
const PROP_BOTTOM_RIGHT = 'bottom-right';
const placementEnum = [PROP_TOP_LEFT, PROP_TOP_RIGHT, PROP_BOTTOM_LEFT, PROP_BOTTOM_RIGHT];

// 延长弹窗关闭时间
const DELAY_TIME = 500;
</script>

<script setup>
import { nextTick, ref, watch } from 'vue';
// 控制弹窗显隐
const isVisible = ref(false);
let timeout;
// 鼠标移入触发事件
const onMouseEnter = () => {
  isVisible.value = true;
  if (timeout) {
    clearTimeout(timeout);
  }
};
// 鼠标离开触发事件
const onMouseLeave = () => {
  // 类似防抖 延长气泡关闭时长
  timeout = setTimeout(() => {
    isVisible.value = false;
    timeout = null;
  }, DELAY_TIME);
};

// 弹窗显示位置可选设置：
// 1.指定所有可选位置的常量，并生成enum
// 2.通过prop控制指定位置
const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const res = placementEnum.includes(val);
      if (!res) {
        throw new Error(`你的placement必须是${placementEnum.join('、')}中的类型`);
      }
      return res;
    }
  }
});
// 3.获取元素的DOM，创建读取元素尺寸的方法
const referenceTarget = ref(null);
const contentTarget = ref(null);
// 计算元素尺寸
const useElementSize = (target) => {
  if (!target) return {};
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  };
};
// 4.生成气泡的样式对象，用来控制不同位置对应的不同样式
const contentStyle = ref({
  top: 0,
  left: 0
});
// 5.根据prop计算样式对象
// 气泡展示时进行计算
watch(isVisible, (val) => {
  if (!val) return;
  // 等待元素渲染
  // vue在数据改变后，需要等待一段时间Dom才会变化，所以要用nextTick
  nextTick(() => {
    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0;
        contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px';
        break;
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0;
        contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px';
        break;
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px';
        contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px';
        break;
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px';
        contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px';
        break;
      default:
        break;
    }
  });
});
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
