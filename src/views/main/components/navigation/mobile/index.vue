<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10 duration-500">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-[12.5px] right-[-1px] h-2 px-1 items-center bg-white dark:bg-zinc-900 z-20 shadow-l-white dark:shadow-l-zinc"
        @click="onShowPopup"
      >
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"></m-svg-icon>
      </li>

      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
      ></li>

      <!-- fontsize设置固定值会很呆，每个手机的大小都不一样，所以要用rem去重新设置一下（flexible.js里 -->
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{
          'text-zinc-100': $store.getters.currentCategoryIndex === index
        }"
        :ref="setItemRef"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>

    <!--  汉堡按钮弹窗 -->
    <m-popup v-model="isVisible">
      <menu-vue @onItemClick="onItemClick"></menu-vue>
    </m-popup>
    <!-- v-model会自动监听 update:modelValue 并赋值isVisible = $event，等同于：
          <m-popup
            :modelValue="isVisible"
            @update:modelValue="isVisible = $event"
          />
    -->
  </div>
</template>

<script setup>
import MenuVue from '@/views/main/components/menu/index.vue';
import { useScroll } from '@vueuse/core';
import { onBeforeUpdate, ref, watch } from 'vue';
import { useStore } from 'vuex';

// 控制popup展示
const isVisible = ref(false);
const onShowPopup = () => {
  isVisible.value = true;
};

// 滑块样式
const sliderStyle = ref({
  //通过translateX改变滑块移动的位置，实现slider根据所选项进行显示
  transform: 'translateX(0px)',
  width: '51px'
});

// 选中item下标
// const currentCategoryIndex = ref(0);
const store = useStore();

// 获取选中item的下标
let itemRefs = [];
const setItemRef = (el) => {
  // console.log(el);
  if (el) {
    itemRefs.push(el);
  }
};
// 数据改变之后 dom更新前触发
onBeforeUpdate(() => {
  itemRefs = []; //清空itemRefs，这样就可以重新获取，不会造成之前删除的还在
});

// 获取ul的横向滚动距离
const ulTarget = ref(null);
// 通过vueuse的useScroll方法获取响应式的scroll滚动距离
const { x: ulScrollLeft } = useScroll(ulTarget); //解构赋值 改名

// 监听item变化，当currentCategoryIndex发生变化时，获取item下标元素的left和width，计算sliderStyle并更新，即可实现滑块的滚动
watch(
  () => store.getters.currentCategoryIndex,
  (val) => {
    const { width, left } = itemRefs[val].getBoundingClientRect();
    // console.log(rect);
    sliderStyle.value = {
      //滑块的位置 = ul 横向滚动的位置 + 当前元素的 left
      transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
      width: width + 'px'
    };
  }
);

// 监听item的选择（nav栏选择不同目录
const onItemClick = (item) => {
  // currentCategoryIndex.value = index;
  store.commit('app/changeCurrentCategory', item);
  isVisible.value = false; //在弹出菜单中选择后关闭蒙层
};
</script>

<style lang="scss" scoped></style>
