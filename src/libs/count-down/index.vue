<template>
  <div>
    <!-- 自定义内容（插槽占位 -->
    <slot />
    <!-- 默认显示内容 -->
    <p class="text-sm">{{ showTime }}</p>
  </div>
</template>

<script>
// 倒计时结束
const EMITS_FINISH = 'finish';
// 倒计时改变
const EMITS_CHANGE = 'change';
// 倒计时时间间隔
const INTERVAL_COUNT = 1000;
</script>

<script setup>
import { computed, onUnmounted, ref, watch } from 'vue';
import dayjs from './utils';

const props = defineProps({
  // 时间戳 （毫秒
  time: {
    type: Number,
    required: true
  },
  // 格式（dayjs
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
});

const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE]);

// 倒计时时长变量
const duration = ref(0);

// 开始倒计时
let interval = null;
const start = () => {
  close();
  interval = setInterval(() => {
    durationFn();
  }, INTERVAL_COUNT);
};

// 倒计时的执行行为
const durationFn = () => {
  duration.value -= INTERVAL_COUNT;
  // 时间改变 调用change事件
  emits(EMITS_CHANGE);
  // 监听结束行为
  if (duration.value <= 0) {
    duration.value = 0;
    emits(EMITS_FINISH);
    close(); //倒计时完成了 触发finish事件，并关闭倒计时
  }
};

// 倒计时结束
const close = () => {
  if (interval) {
    clearInterval(interval);
  }
};

// 开始倒计时（监听props里的time来了没有
watch(
  () => props.time,
  (val) => {
    duration.value = val;
    start();
  },
  {
    immediate: true
  }
);

// 组件销毁时要清理倒计时
onUnmounted(() => {
  close();
});

// 显示时间格式
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format);
});
</script>

<style lang="scss" scoped></style>
