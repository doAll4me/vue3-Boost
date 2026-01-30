<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
    <div
      class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4"
    >
      <!-- 移动端 navbar 处理 -->
      <m-navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick"> 精选会员 </m-navbar>

      <div class="py-2 px-1">
        <h2 class="text-center text-[34px] font-bold tracking-widest text-yellow-600">精选VIP</h2>

        <p class="text-center text-lg text-yellow-500">升级精选VIP，畅想所有内容</p>

        <div
          class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          <pay-menu-item-vue
            v-for="item in vipPayListData"
            :key="item.id"
            :hot="item.isHot"
            :select="item.id === currentPayData.id"
            :data="item"
            @click="onChangeCurrentPay"
          />
        </div>

        <p class="mt-1 text-sm text-zinc-500">
          {{ currentPayData.desc }}
        </p>

        <!-- 支付 -->
        <!-- <m-count-down :time="10000"></m-count-down> -->
        <payment-vue class="mt-2"></payment-vue>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getVipPayList } from '@/api/pay';
import { isMobileTerminal } from '@/utils/flexible';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import payMenuItemVue from './components/pay-menu-item.vue';
import paymentVue from './components/payment/index.vue';

const router = useRouter();
const store = useStore();

const vipPayListData = ref([]);
const currentPayData = ref({});
const getVipPayListData = async () => {
  const res = await getVipPayList();
  // console.log(res);
  vipPayListData.value = res;
  currentPayData.value = vipPayListData.value[0];
};
getVipPayListData();

const onChangeCurrentPay = (item) => {
  currentPayData.value = item;
};

// 移动端左上角后退按钮点击事件
const onNavbarLeftClick = () => {
  store.commit('app/changeRouterType', 'back');
  router.back();
};
</script>

<style lang="scss" scoped></style>
