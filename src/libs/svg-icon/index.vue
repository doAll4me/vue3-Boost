<!-- 显示svg -->
<template>
  <!-- aria-hidden是一个无障碍（Accessibility, a11y）相关的 ARIA 属性，用来告诉屏幕阅读器：这个元素要不要被“读出来”。 -->
  <svg aria-hidden="true">
    <use :href="symbolId" :class="fillClass" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  // 显示的svg
  name: {
    type: String,
    required: true
  },
  // svg图标的颜色
  color: {
    type: String
  },
  // tailwind指定svg颜色的类名
  fillClass: {
    type: String
  }
});

// 计算属性（给icon的name加一个‘#icon-’，后续可以直接获取icon文件
const symbolId = computed(() => `#icon-${props.name}`);
</script>

<style lang="scss" scoped></style>
