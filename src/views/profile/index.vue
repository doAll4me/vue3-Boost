<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-500 overflow-auto xl:pt-1">
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-500 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border xl:px-4 xl:py-2"
    >
      <!-- 头部 -->
      <!-- 移动端navbar -->
      <m-navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick">个人资料</m-navbar>
      <!-- PC端 -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">个人资料</div>

      <!-- 主体内容 -->
      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:text-center">
        <!-- 头像部分 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="w-8 inline-block mb-2 font-black text-sm dark:text-zinc-300 xl:block xl:mx-auto"
            >我的头像</span
          >
          <div
            class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]"
            @click="onAvatarClick"
          >
            <!-- 头像 -->
            <img
              class="rounded-full w-full h-full xl:inline-block"
              :src="$store.getters.userInfo.avatar"
              alt=""
            />
            <!-- 头像:鼠标移入切换头像蒙层 -->
            <div
              class="absolute top-0 rounded-full w-full h-full duration-300 bg-black/40 hidden xl:group-hover:block"
            >
              <m-svg-icon name="change-header-image" class="w-2 h-2 m-auto mt-2"></m-svg-icon>
              <div class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5">点击更换头像</div>
            </div>
          </div>
          <!-- 头像:隐藏域 -->
          <input
            v-show="false"
            ref="inputFileTarget"
            type="file"
            accept=".png,.jpg,.jpeg,.gif"
            @change="onSelectImgHandler"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持jpg、png、jpeg、gif格式大小1M 以内的图片
          </p>
        </div>

        <!-- 信息输入部分 -->
        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">用户名</span>
          <m-input class="w-full" max="20" v-model="$store.getters.userInfo.nickname"></m-input>
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">职位</span>
          <m-input class="w-full" v-model="$store.getters.userInfo.title"></m-input>
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">公司</span>
          <m-input class="w-full" v-model="$store.getters.userInfo.company"></m-input>
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人主页</span>
          <m-input class="w-full" v-model="$store.getters.userInfo.homePage"></m-input>
        </div>
        <!-- 个人介绍-->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人介绍</span>
          <m-input
            class="w-full"
            v-model="$store.getters.userInfo.introduction"
            type="textarea"
            max="50"
          ></m-input>
        </div>

        <!-- 保存修改按钮 -->
        <m-button
          class="w-full mt-4 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          >保存修改</m-button
        >

        <!-- 退出登录按钮 -->
        <m-button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogoutClick"
          >退出登录</m-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { confirm } from '@/libs';
import { isMobileTerminal } from '@/utils/flexible';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

// 移动端下navbar左侧点击事件
const onNavbarLeftClick = () => {
  router.back();
};

// 移动端下的退出登录
const onLogoutClick = () => {
  confirm('您确定要退出登录吗？').then(() => {
    store.dispatch('user/logout');
    // router.push('/login');
  });
};

// 选择头像
const inputFileTarget = ref(null);
const onAvatarClick = () => {
  inputFileTarget.value.click();
};
// 选择文件后的回调函数
const onSelectImgHandler = () => {};
</script>

<style lang="scss" scoped></style>
