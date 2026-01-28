<template>
  <transition name="down">
    <div
      v-show="isVisible"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>

<script>
const SUCCESS = 'success';
const WARN = 'warn';
const ERROR = 'error';
const typeEnum = [SUCCESS, WARN, ERROR];
</script>

<script setup>
import { onMounted, ref } from 'vue';
import mSvgIcon from '../svg-icon/index.vue';

const props = defineProps({
  // 展示文本
  content: {
    type: String,
    required: true
  },
  // 提示类型（警告、成功？）
  type: {
    type: String,
    required: true,
    validator(val) {
      const res = typeEnum.includes(val);
      if (!res) {
        throw new Error(`你的type必须是${typeEnum.join('、')}中的类型`);
      }
      return typeEnum.includes(val);
    }
  },
  // 展示时长
  duration: {
    type: Number
  },
  // 关闭的回调
  destroy: {
    type: Function
  }
});

// 控制message显隐
const isVisible = ref(false);

// 样式表数据
const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass: 'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass: 'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass: 'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
  }
};

// 展示逻辑(为了保证动画成功展示，需要在onMounted后进行展示)
const animDuration = '0.5s';
onMounted(() => {
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
    setTimeout(
      () => {
        if (props.destroy) {
          props.destroy();
        }
      },
      parseInt(animDuration.replace('0', '').replace('s', '') * 100)
    );
  }, props.duration);
});
</script>

<style lang="scss" scoped>
// 动画样式
.down-enter-active,
.down-leave-active {
  transition: all v-bind(animDuration);
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
