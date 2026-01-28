<template>
  <div class="flex-1 guide-search">
    <m-search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <div>
          <!-- 搜索提示(只在输入了内容时才会提示) -->
          <hint-vue
            :search-text="inputValue"
            v-show="inputValue"
            @item-click="onSearchHandler"
          ></hint-vue>

          <!-- 最近搜索（历史 -->
          <history-vue v-show="!inputValue" @item-click="onSearchHandler"></history-vue>

          <!-- 推荐主题 -->
          <theme-vue v-show="!inputValue"></theme-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import hintVue from './hint.vue';
import historyVue from './history.vue';
import themeVue from './theme.vue';

const store = useStore();
const inputValue = ref('');

// 搜索回调函数
const onSearchHandler = (val) => {
  inputValue.value = val;
  if (val) {
    store.commit('search/addHistory', val);
    // 触发searchtext的变化
    store.commit('app/changeSearchText', val);
  }
};
</script>

<style lang="scss" scoped></style>
