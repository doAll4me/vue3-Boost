<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <!-- 具名插槽：用户头像显示区（鼠标进入显示弹窗 -->
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="guide-my w-3 h-3 rounded-sm"
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"
          alt=""
        />
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip图标 -->
        <m-svg-icon class="h-1.5 w-1.5 absolute right-[16px] bottom-0" name="vip"></m-svg-icon>
      </div>
    </template>
    <!-- 匿名插槽：弹窗显示内容(气泡) -->
    <div class="w-[140px] overflow-hidden">
      <!-- 根据themeArr进行多次渲染 -->
      <div
        v-for="item in menuArr"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
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
const menuArr = [
  { id: '0', title: '个人资料', icon: 'profile', path: '/profile' },
  { id: '1', title: '升级VIP', icon: 'vip-profile', path: '/member' },
  { id: '2', title: '退出登录', icon: 'logout', path: '' }
];
</script>

<style lang="scss" scoped></style>
