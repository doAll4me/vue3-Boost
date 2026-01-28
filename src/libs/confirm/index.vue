<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
        @click="close"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisible"
        class="w-[80%] fixed top-1/3 left-1/2 translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">{{ title }}</div>
        <!-- 文本 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">{{ content }}</div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{ cancelText }}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{ confirmText }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import mButton from '../button/index.vue';

const props = defineProps({
  // 标题
  title: {
    type: String
  },
  // 描述
  content: {
    type: String,
    required: true
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确定按钮文本
  confirmText: {
    type: String,
    default: '确定'
  },
  // 取消按钮事件
  cancelHandler: {
    type: Function
  },
  // 确定按钮事件
  confirmHandler: {
    type: Function
  },
  // 关闭confirm回调
  close: {
    type: Function
  }
});

// 控制组件是否可见（默认不展示
const isVisible = ref(false);
const show = () => {
  isVisible.value = true;
};

// 处理动画（render函数的渲染
// 为了有动画效果，所以要在onmounted时show这个confirm组件
onMounted(() => {
  show();
});

// 关闭动画执行时间
const duration = '0.5s';

// 取消按钮点击事件
const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler();
  }
  close();
};
// 确定按钮点击事件
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler();
  }
  close();
};
// 关闭弹窗事件
const close = () => {
  isVisible.value = false;
  // 为了有关闭的动画效果，延迟一段时间进行关闭，等待动画完全关闭后再执行
  setTimeout(
    () => {
      if (props.close) {
        props.close();
      }
    },
    parseInt(duration.replace('0.', '').replace('s', '') * 100)
  );
};
</script>

<style lang="scss" scoped>
// fade动画
// 进入和离开时的过渡
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}
// 准备进入，离开完成
.fade-enter-form,
.fade-leave-to {
  opacity: 0;
}

// up动画
// 进入和离开时的过渡
.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}
// 准备进入，离开完成
.up-enter-form,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
