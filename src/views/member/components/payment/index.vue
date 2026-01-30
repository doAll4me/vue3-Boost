<template>
  <div>
    <!-- pc端支付样式 -->
    <pc-payment-vue v-if="!isMobileTerminal"></pc-payment-vue>
    <!-- 移动端支付样式 -->
    <mobile-payment-vue v-else></mobile-payment-vue>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible';
import mobilePaymentVue from './mobile-payment/index.vue';
import pcPaymentVue from './pc-payment/index.vue';
</script>

<style lang="scss" scoped></style>
