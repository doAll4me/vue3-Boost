<template>
  <div>
    <!-- <m-input class="z-50 w-[300px]" v-model="text" max="50"></m-input> -->
    <!-- <m-message type="success" content="测试" duration="1000"></m-message> -->
    <!-- <m-confirm></m-confirm> -->
    <!-- <m-button type="info">你好</m-button> -->
    <!-- {{ isMobileTerminal }} -->
    <!-- 一级路由出口 -->
    <div class="h-screen w-screen fixed top-0 left-0">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const text = ref('');
</script>

<style lang="scss" scoped></style>
