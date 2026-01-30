<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <!-- 具名插槽：用户头像显示区（鼠标进入显示弹窗 -->
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
        v-if="$store.getters.token"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="guide-my w-3 h-3 rounded-sm"
          :src="$store.getters.userInfo.avatar"
          alt=""
        />
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip图标 -->
        <m-svg-icon
          v-if="$store.getters.userInfo.vipLevel"
          class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          name="vip"
        ></m-svg-icon>
      </div>

      <!-- 没登录时显示登录按钮 -->
      <div v-else>
        <m-button class="guide-my" icon="profile" iconColor="#fff" @click="onToLogin"></m-button>
      </div>
    </template>

    <!-- 匿名插槽：弹窗显示内容(气泡) -->
    <div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
      <!-- 根据themeArr进行多次渲染 -->
      <div
        v-for="item in menuArr"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-900 text-sm dark:text-zinc-300">{{ item.title }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { confirm } from '@/libs';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();

const menuArr = [
  { id: 0, title: '个人资料', icon: 'profile', path: '/profile' },
  { id: 1, title: '升级VIP', icon: 'vip-profile', path: '/member' },
  { id: 2, title: '退出登录', icon: 'logout', path: '' }
];

const router = useRouter();
// 登录按钮点击事件
const onToLogin = () => {
  // 移动端下跳转动画类型
  store.commit('app/changeRouterType', 'push');
  router.push('./login');
};

// menu点击事件
const onItemClick = (item) => {
  // 退出登录
  if (item.id === 2) {
    // 退出确认提示
    confirm('您确定退出登录吗？').then(() => {
      store.dispatch('user/logout');
    });
    return;
  } else if (item.id === 0) {
    store.commit('app/changeRouterType', 'push');
    router.push('/profile');
  } else if (item.id === 1) {
    store.commit('app/changeRouterType', 'push');
    router.push('/member');
  }
};
</script>

<style lang="scss" scoped></style>
