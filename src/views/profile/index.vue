<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-500 overflow-auto xl:pt-1">
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-500 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border xl:px-4 xl:py-2"
    >
      <!-- 头部 -->
      <!-- 移动端navbar -->
      <m-navbar sticky v-if="isMobileTerminal" @click="onNavbarLeftClick">个人资料</m-navbar>
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
          <m-input class="w-full" max="20" v-model="userInfo.nickname"></m-input>
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">职位</span>
          <m-input class="w-full" v-model="userInfo.title"></m-input>
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">公司</span>
          <m-input class="w-full" v-model="userInfo.company"></m-input>
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人主页</span>
          <m-input class="w-full" v-model="userInfo.homePage"></m-input>
        </div>
        <!-- 个人介绍-->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人介绍</span>
          <m-input
            class="w-full"
            v-model="userInfo.introduction"
            type="textarea"
            max="50"
          ></m-input>
        </div>

        <!-- 保存修改按钮 -->
        <m-button
          class="w-full mt-4 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          :loading="loading"
          @click="onChangeProfile"
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

    <!-- 图片裁剪 -->
    <!-- PC端 dialog -->
    <m-dialog v-if="!isMobileTerminal" title="裁剪头像" v-model="isDialogVisible">
      <change-avatar-vue :blob="currentBlob" @close="isDialogVisible = false"> </change-avatar-vue>
    </m-dialog>

    <!-- 移动端 pop -->
    <m-popup v-else v-model="isDialogVisible" :class="{ 'h-screen': isDialogVisible }">
      <change-avatar-vue :blob="currentBlob" @close="isDialogVisible = false"> </change-avatar-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { confirm, message } from '@/libs';
import { isMobileTerminal } from '@/utils/flexible';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { putProfile } from '../../api/sys';
import changeAvatarVue from './components/change-avatar.vue';

const store = useStore();
const router = useRouter();

// 移动端下navbar左侧点击事件
const onNavbarLeftClick = () => {
  store.commit('app/changeRouterType', 'back');
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
const isDialogVisible = ref(false);
const currentBlob = ref('');
const onSelectImgHandler = () => {
  // 获取选中的文件
  const imgFile = inputFileTarget.value.files[0];
  // console.log(imgFile);
  // 生成blob对象(类文件对象)
  currentBlob.value = URL.createObjectURL(imgFile);
  // console.log(blob);
  // 在dialog中展示blob，进行图片裁剪
  isDialogVisible.value = true;
};

// 当两次选中文件是同一个时，change的回调不会被再次触发
// 解决：只需要在每次选择的图片不再被使用时，清空掉inputTarget即可
watch(isDialogVisible, (val) => {
  if (!val) {
    inputFileTarget.value.value = null;
  }
});

// 数据本地同步修改(这样写会一修改就保存，都不用点保存修改 不太合理)
// const changeStoreUserInfo = (key, value) => {
//   store.commit('user/setUserInfo', {
//     ...store.getters.userInfo,
//     [key]: value
//   });
// };
// 所以在本地存储一个userInfo，这样也方便直接使用v-model进行双向绑定
const userInfo = ref(store.getters.userInfo);

// 修改个人信息
const loading = ref(false);
const onChangeProfile = async () => {
  loading.value = true;
  await putProfile(userInfo.value);
  // 在这里进行数据同步
  store.commit('user/setUserInfo', userInfo.value);
  message('用户信息修改成功', 'success');
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
