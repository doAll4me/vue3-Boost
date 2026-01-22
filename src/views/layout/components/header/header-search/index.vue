<template>
  <div class="flex-1">
    <m-search v-model="inputValue">
      <template #dropdown>
        <div>dropdown</div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const inputValue = ref('');
</script>

<style lang="scss" scoped></style>
