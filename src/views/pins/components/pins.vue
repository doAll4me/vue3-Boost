<template>
  <div
    class="fixed left-0 top-0 w-screen h-screen z-20 backdrop-blur-4xl bg-white dark:bg-zinc-800 pb-2 overflow-y-auto xl:p-2 xl:bg-transparent"
  >
    <!-- 移动端下的navbar -->
    <m-navbar v-if="isMobileTerminal" sticky>
      {{ pexelData.title }}

      <template #right>
        <m-svg-icon name="share" class="w-3 h-3" fillClass="fill-zinc-900 dark:fill-zinc-200">
        </m-svg-icon>
      </template>
    </m-navbar>

    <!-- pc端下的navbar -->
    <m-svg-icon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></m-svg-icon>

    <!-- 内容区 -->
    <div v-if="pexelData.title" class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="pexelData.photo"
        alt=""
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
      >
        <!-- 收藏 分享图标 -->
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <m-svg-icon
            name="share"
            class="w-4 h-4 p-0.5 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
          ></m-svg-icon>
          <m-button
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-button>
        </div>

        <!-- 标题 -->
        <p class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5">
          {{ pexelData.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
          <img v-lazy class="h-3 w-3 rounded-full" :src="pexelData.avatar" alt="" />
          <p class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{ pexelData.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPexelsFromId } from '@/api/pexels';
import { isMobileTerminal } from '@/utils/flexible';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const router = useRouter();

// 图片数据
const pexelData = ref({});
// 根据id请求对应图片详情页数据
const getPexelData = async () => {
  const res = await getPexelsFromId(props.id);
  // console.log(res);
  pexelData.value = res;
};
getPexelData();

// 关闭详情页面
const onPop = () => {
  store.commit('app/changeRouterType', 'back');
  router.back();
};
</script>

<style lang="scss" scoped></style>
