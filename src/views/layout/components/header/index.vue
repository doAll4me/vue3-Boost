<template>
  <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1">
    <div class="flex items-center">
      <img
        class="h-4 cursor-pointer mr-2"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
        @click="onToHome"
      />
      <header-search-vue class="mr-1"></header-search-vue>
      <header-my-vue class="mr-1"></header-my-vue>
      <header-theme-vue></header-theme-vue>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import headerMyVue from './header-my.vue';
import headerSearchVue from './header-search/index.vue';
import headerThemeVue from './header-theme.vue';

const router = useRouter();
const onToHome = () => {
  router.push('./');
};
</script>

<style lang="scss" scoped></style>
