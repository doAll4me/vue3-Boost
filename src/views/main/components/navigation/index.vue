<template>
  <mobile-navigation-vue v-if="isMobileTerminal" />
  <pc-navigation-vue v-else></pc-navigation-vue>
</template>

<script setup>
import { useStore } from 'vuex';
import { isMobileTerminal } from '../../../../utils/flexible';
import mobileNavigationVue from './mobile/index.vue';
import pcNavigationVue from './pc/index.vue';
const store = useStore();
// 触发category获取数据
store.dispatch('category/useCategoryData');
</script>

<style lang="scss" scoped></style>
