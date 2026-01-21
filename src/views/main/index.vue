<template>
  <div>
    <navigation-vue :categoryData="categoryData" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getCategory } from "../../api/category";
import navigationVue from "./components/navigation/index.vue";
const categoryData = ref([]);
const getCategoryData = async () => {
  // 必须用category解构
  const { categorys } = await getCategory();
  categoryData.value = categorys;
};
getCategoryData();
</script>

<style lang="scss" scoped></style>
