<template>
  <div>
    <!--传送门，可以传送里面的内容至任何位置 -->
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="isVisible"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isVisible = false"
        />
      </transition>

      <!-- 内容 -->
      <transition name="popup-down-up">
        <div
          v-if="isVisible"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock, useVModel } from '@vueuse/core';
import { watch } from 'vue';

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
});
// 点击蒙版区域需要关闭当前蒙层组件，所以要设置一个emits通知父组件修改
// const emits = defineEmits(['update:modelValue']);
// 利用useVModel构造一个响应式数据，当值发生变化时，会自动触发emit修改modelValue
// useVModel=props+emit ——>  isVisible，这样就可以不用emit了
const isVisible = useVModel(props);

// 锁定蒙版开启时的滚动功能
const isLock = useScrollLock(document.body);
watch(
  // () => props.modelValue,
  isVisible, //响应式数据，可直接监听
  (val) => {
    isLock.value = val;
  },
  {
    immediate: true
  }
);
</script>

<style lang="scss" scoped>
// fade动画
// 进入和离开时的过渡
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
// 准备进入，离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
// 最初和最终的状态
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
