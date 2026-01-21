<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-1 right-[-1px] h-4 px-1 items-center bg-white z-20 shadow-l-white"
      >
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"></m-svg-icon>
      </li>

      <!-- fontsize设置固定值会很呆，每个手机的大小都不一样，所以要用rem去重新设置一下（flexible.js里 -->
      <li
        v-for="item in categoryData"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  categoryData: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
