<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      v-html="highlightText(item)"
      @click="onItemClick(item)"
    ></div>
  </div>
</template>

<script>
const EMITS_ITEM_CLICK = 'itemClick';
</script>

<script setup>
import { watchDebounced } from '@vueuse/core';
import { ref } from 'vue';
import { getHint } from '../../../../../api/pexels';

const props = defineProps({
  // 查询的文本
  searchText: {
    type: String,
    required: true
  }
});

const emits = defineEmits([EMITS_ITEM_CLICK]);

// 发起请求 搜索请求提示数据
const hintData = ref([]);
const getHintDate = async () => {
  if (!props.searchText) return;

  const res = await getHint(props.searchText);
  // console.log(res.result);
  hintData.value = res.result; //得到搜索提示数据
};

// 监听输入值变化，一变化我们就调用获取提示词的函数
// watch(() => props.searchText, getHintDate, {
//   immediate: true
// });
// 防抖监听
watchDebounced(() => props.searchText, getHintDate, {
  immediate: true,
  debounce: 500
});

// 点击搜索提示词事件处理
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item);
};

// 处理关键字高亮
const highlightText = (text) => {
  // 高亮标签
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`;
  // 正则表达式筛选出匹配的文本,用高亮标签进行替换
  const reg = new RegExp(props.searchText, 'gi'); //g——全局，i——不区分大小写
  // 替换
  return text.replace(reg, highlightStr);
};
</script>

<style lang="scss" scoped></style>
