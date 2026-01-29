<template>
  <div class="relative leading-[0px]">
    <!-- 单行 -->
    <input
      v-if="type === TYPE_TEXT"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      type="text"
      v-model="text"
      :maxlength="max"
    />
    <!-- 多行 -->
    <textarea
      v-if="type === TYPE_TEXTAREA"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      v-model="text"
      rows="5"
      :maxlength="max"
    />
    <!-- 最大长度 -->
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
      >{{ currentNumber }}/{{ max }}</span
    >
  </div>
</template>

<script>
// 单行文本输入
const TYPE_TEXT = 'text';
// 多行文本输入
const TYPE_TEXTAREA = 'textarea';
</script>

<script setup>
import { useVModel } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps({
  // 1.双向数据绑定
  modelValue: {
    type: String,
    required: true
  },
  // 2.類型（单行 多行
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(value) {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA];
      const res = arr.includes(value);
      if (!res) {
        throw new Error(`你的type必须在可选值范围内[${arr.join('、')}]`);
      }
      return res;
    }
  },
  // 3.最大文本输入
  max: {
    type: [String, Number]
  }
});

defineEmits(['update:modelValue']);

// 输入的字符（useVmodel进行双向绑定
const text = useVModel(props);

// 输入的字符数
const currentNumber = computed(() => {
  return text.value.length;
});
</script>

<style lang="scss" scoped></style>
