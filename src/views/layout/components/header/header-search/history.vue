<template>
  <div>
    <!-- 顶部文字和删除全部icon -->
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <m-svg-icon
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover: bg-zinc-100 dark:bg-zinc-800"
        name="delete"
        fillClass="fill-zinc-400"
        @click="onDeleteAllClick"
      ></m-svg-icon>
    </div>

    <!-- 历史搜索数据 -->
    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in $store.getters.historys"
        :key="index"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300 hover:bg-zinc-200"
        @click="onItemClick(item)"
      >
        <span> {{ item }}</span>
        <m-svg-icon
          name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
          @click.stop="onDeleteClick(index)"
        ></m-svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
const EMITS_ITEM_CLICK = 'itemClick';
</script>

<script setup>
import { confirm } from '@/libs';
import { useStore } from 'vuex';

const emits = defineEmits([EMITS_ITEM_CLICK]);
const store = useStore();

// 删除全部历史搜索记录
const onDeleteAllClick = () => {
  // confirm('标题', '你确定要删除所有记录吗？', '取消', '确定删除')
  confirm('你确定要删除所有记录吗？')
    .then(() => {
      store.commit('search/deleteAllHistory');
    })
    .catch(() => {
      console.log('取消');
    });
};

// 删除单条历史记录
const onDeleteClick = (index) => {
  store.commit('search/deleteHistory', index);
};

// 触发单条历史记录搜索
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item);
};
</script>

<style lang="scss" scoped></style>
