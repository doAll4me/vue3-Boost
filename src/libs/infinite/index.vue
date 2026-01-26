<template>
  <div>
    <!-- 内容 -->
    <slot />
    <!-- 加载转圈符 -->
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多(在Loading为true时显示) -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多数据 (在加载完成的时候显示)-->
      <p v-if="isFinished" class="text-center text-base to-zinc-400">已经没有更多数据了🐱</p>
    </div>
  </div>
</template>

<script setup>
import { useIntersectionObserver, useVModel } from '@vueuse/core';
import { ref, watch } from 'vue';
const props = defineProps({
  // 双向数据绑定（是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
});

// 事件 onload:是否触发更新    update：modelValue更新双向绑定数据
const emits = defineEmits(['onLoad', 'update:modelValue']);

// 用useVModel简化处理Loading状态
const loading = useVModel(props);

// 滚动元素
const loadingTarget = ref(null);
// 记录当前是否在底部
const targetIsIntersecting = ref(false);
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  targetIsIntersecting.value = isIntersecting;
  emitLoad(); // 首次触发
});

// 触发load事件的方法
const emitLoad = () => {
  // 延长时间获取数据
  setTimeout(() => {
    // isIntersecting=true时，当前元素可见  ===>   加载图标可见时，证明要处理加载的逻辑
    if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
      // 如果当前loading还未被触发、数据还没加载完全（没到尽头）才进行以下操作
      // 修改Loading标记
      loading.value = true;
      // 触发加载行为
      emits('onLoad');
    }
  }, 200);
};

// 监听load变化(解决如果首屏加载没填满就不会自动触发加载的问题)
watch(loading, emitLoad);
</script>

<style lang="scss" scoped></style>
