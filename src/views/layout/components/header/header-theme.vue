<template>
  <m-popover placement="bottom-left">
    <!--具名插槽：触发弹窗的内容 -->
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      >
      </m-svg-icon>
    </template>

    <!-- 匿名插槽：触发的弹窗内的内容 -->
    <div class="w-[140px] overflow-hidden">
      <!-- 根据themeArr进行多次渲染 -->
      <div
        v-for="item in themeArr"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-900 text-sm dark:text-zinc-300">{{ item.name }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants';
import { computed } from 'vue';
import { useStore } from 'vuex';

const themeArr = [
  { id: '0', type: THEME_LIGHT, icon: 'theme-light', name: '极简白' },
  { id: '1', type: THEME_DARK, icon: 'theme-dark', name: '极夜黑' },
  { id: '2', type: THEME_SYSTEM, icon: 'theme-system', name: '跟随系统' }
];

// 1.监听主题切换行为
const store = useStore();
const onItemClick = (themeItem) => {
  // 2.根据行为保存当前主题选择到vuex中
  store.commit('theme/changeTheme', themeItem.type);
  // console.log(themeItem);
};
// 3.根据vuex中保存的主题 展示header-theme下显示的所选图标
const svgIconName = computed(() => {
  // console.log(store.getters.themeType);
  const findTheme = themeArr.find((item) => {
    return item.type === store.getters.themeType;
  });
  // console.log(findTheme);
  return findTheme?.icon || THEME_LIGHT;
});
// 4.根据vuex中保存的主题 修改html中的class(utils中的theme)

// 5.跟随系统主题(utils中的theme)
</script>

<style lang="scss" scoped></style>
