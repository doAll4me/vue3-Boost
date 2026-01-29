<!-- 登录页 -->
<template>
  <div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">
    <!-- 头部背景 图片 -->
    <header-vue></header-vue>

    <!-- 内容表单 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3 class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block">
        账号登录
      </h3>
      <!-- 表单 -->
      <VeeForm @submit="onLoginHandler">
        <VeeField
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
          v-model="loginForm.username"
        />
        <VeeErrorMessage class="text-sm text-red-600 block mt-0.5 text-left" name="username" />
        <!-- 密码 -->
        <VeeField
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          type="text"
          name="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="loginForm.password"
        />
        <VeeErrorMessage class="text-sm text-red-600 block mt-0.5 text-left" name="password" />

        <!-- 注册跳转按钮 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
            >去注册</a
          >
        </div>
        <!-- 登录按钮 -->
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :isActiveAnim="false"
          :loading="loading"
          >登录</m-button
        >
      </VeeForm>

      <!-- 第三方登录按钮 -->
      <div class="flex justify-around mt-4">
        <!-- qq -->
        <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
        <!-- 微信 -->
        <m-svg-icon class="w-4 cursor-pointer" name="weixin"></m-svg-icon>
      </div>
    </div>

    <!-- 人类行为验证 -->
    <slider-captcha-vue
      v-if="isSliderCaptchaVisible"
      @close="isSliderCaptchaVisible = false"
      @success="onCaptchaSuccess"
    ></slider-captcha-vue>
  </div>
</template>

<script setup>
import { LOGIN_TYPE_USERNAME } from '@/constants';
import { ErrorMessage as VeeErrorMessage, Field as VeeField, Form as VeeForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import headerVue from '../component/header.vue';
import { validatePassword, validateUsername } from '../validate';
import SliderCaptchaVue from './slider-captcha.vue';

const store = useStore();
const router = useRouter();

// 控制sliderCaptcha展示
const isSliderCaptchaVisible = ref(false);

// 提交表单 触发登录(仅在表单校验通过后触发)
const onLoginHandler = () => {
  // console.log('submit');
  isSliderCaptchaVisible.value = true;
};

// 人类行为验证通过 触发函数
const onCaptchaSuccess = () => {
  isSliderCaptchaVisible.value = false;
  // 登录操作
  // console.log('开始登录');
  onLogin();
};

// 用户登录行为
const loading = ref(false);
const loginForm = ref({
  username: 'LGD_Sunday',
  password: '123123'
});
const onLogin = async () => {
  loading.value = true;
  try {
    await store.dispatch('user/login', {
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
  router.push('/');
};
</script>

<style lang="scss" scoped></style>
