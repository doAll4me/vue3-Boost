<template>
  <div>
    <m-infinite v-model="loading" :isFinished="isFinished" @onLoad="getPexelsData">
      <!-- 瀑布流效果 -->
      <!-- data数据源   nodeKey唯一标识   column渲染列数   picturePreReading图片是否需要预渲染 -->
      <m-waterfall
        class="px-1 w-full"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <!-- 插槽：一个插槽对应一个item -->
        <template v-slot="{ item, width }">
          <item-vue :data="item" :width="width" @click="onToPins"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite>

    <!-- pins详情内容展示 -->
    <transition :css="false" @beforeEnter="beforeEnter" @enter="enter" @leave="leave">
      <pins-vue v-if="isVisible" :id="currentPins.id"></pins-vue>
    </transition>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible';
import pinsVue from '@/views/pins/components/pins.vue';
import { useEventListener } from '@vueuse/core';
import gsap from 'gsap';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { getPexelsList } from '../../../../api/pexels';
import itemVue from './item.vue';

// loading状态 （数据是否在加载中
const loading = ref(false);
// isFinished状态 （数据是否全部加载完成
const isFinished = ref(false);

// 数据
const pexelsList = ref([]);
// 请求参数
let query = {
  page: 1,
  size: 20
};
// 加载数据的方法
const getPexelsData = async () => {
  // 若数据已经完全加载完成，就不需要再执行了
  if (isFinished.value) {
    return;
  }

  // 完成一次请求后，后续请求让page自增
  if (pexelsList.value.length) {
    query.page += 1;
  }

  // 触发接口 请求数据
  let res = await getPexelsList(query);
  // console.log(res.list);

  if (query.page === 1) {
    // 如果是请求的第一页数据，可以直接加在list里
    pexelsList.value = res.list;
  } else {
    // 如果是第一页以后的数据，需要加在list后面
    pexelsList.value.push(...res.list);
  }

  // 判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true;
  }

  // 修改loading标记  表示请求处理完成
  loading.value = false;
};
// getPexelsData();会自动触发loading 自动调用，不用手动执行一遍了

// 修改query的方法
const resetQuery = (newQuery) => {
  // 新的请求参数
  query = { ...query, ...newQuery };
  // 重置状态
  isFinished.value = false;
  pexelsList.value = []; //不需要手动触发load，因为数据置空了，会自动请求数据
};

// 监听所选目录是否被修改
const store = useStore();
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    });
  }
);

// 监听searchText的变化
watch(
  () => store.getters.searchText,
  (val) => {
    resetQuery({
      page: 1,
      searchText: val
    });
  }
);

// 控制pins展示
const isVisible = ref(false);
// 记录当前选中的pins对象属性
const currentPins = ref({});

// 监听浏览器后退事件
useEventListener(window, 'popstate', () => {
  isVisible.value = false;
});

// 进入pins
const onToPins = (item) => {
  // console.log(item);
  // 修改浏览器url（修改但不跳转
  // 三个参数 state(状态对象) title(大多数忽略) url(新的url)
  history.pushState(null, null, `pins/${item.id}`);
  isVisible.value = true;
  currentPins.value = item;
};

// 跳转动画钩子
// 跳转前
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  });
};
// 跳转,进入
const enter = (el, done) => {
  gsap.to(el, {
    //动画时长
    duration: 0.3,
    // 完全展开
    scaleX: 1,
    scaleY: 1,
    // 展开后位置
    translateX: 0,
    translateY: 0,
    // 展开后透明度
    opacity: 1,
    // 完成后的回调
    onComplete: done
  });
};
// 关闭后的状态
const leave = (el, done) => {
  gsap.to(el, {
    //动画时长
    duration: 0.3,
    // 完全关闭
    scaleX: 0,
    scaleY: 0,
    // 关闭后位置
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    // 关闭后透明度
    opacity: 0,
    // 完成后的回调
    onComplete: done
  });
};
</script>

<style lang="scss" scoped></style>
