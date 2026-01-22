<template>
  <div>
    <navigation-vue :categoryData="categoryData" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getCategory } from '../../api/category';
import { ALL_CATEGORY_ITEM } from '../../constants';
import navigationVue from './components/navigation/index.vue';
const categoryData = ref([]);
const getCategoryData = async () => {
  // 必须用category解构
  const { categorys } = await getCategory();
  categoryData.value = categorys;
  categoryData.value.unshift(ALL_CATEGORY_ITEM); //插入默认的首个选项（全部
};
getCategoryData();
</script>

<style lang="scss" scoped></style>
