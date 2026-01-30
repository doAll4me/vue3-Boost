<template>
  <!-- 路由出口 -->
  <router-view v-slot="{ Component }">
    <!-- 动画组件 -->
    <transition :name="transitionName" @before-enter="beforeEnter" @after-leave="afterLeave">
      <!-- 缓存组件 -->
      <keep-alive :include="virtualTaskStack">
        <component
          :is="Component"
          :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }"
          :key="$route.fullPath"
        ></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
// 无动画
const NONE = 'none';
// 进入
const ROUTER_TYPE_PUSH = 'push';
// 退出
const ROUTER_TYPE_BACK = 'back';
const ROUTER_TYPE_ENUM = [NONE, ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK];
</script>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  // 路由跳转的类型 ROUTER_TYPE_ENUM
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const res = ROUTER_TYPE_ENUM.includes(val);
      if (!res) {
        throw new Error(`你的routerType必须是${ROUTER_TYPE_ENUM.join('、')}中的一个`);
      }
      return res;
    }
  },
  // 首页的组件名（首页永远位于栈底，不可以pop出去
  mainComponentName: {
    type: String,
    required: true
  }
});

// 监听router的前置守卫 决定要以什么动画进行跳转
const router = useRouter();
// 跳转动画
const transitionName = ref('');
router.beforeEach((to, from) => {
  transitionName.value = props.routerType;

  // 入栈
  if (props.routerType === ROUTER_TYPE_PUSH) {
    virtualTaskStack.value.push(to.name);
  }
  // 出栈
  else if (props.routerType === ROUTER_TYPE_BACK) {
    virtualTaskStack.value.pop();
  }

  // 进入首页 默认清空虚拟任务栈
  clearTask();
});

// 处理动画状态
const isAnimation = ref(false);
const beforeEnter = () => {
  isAnimation.value = true;
};
const afterLeave = () => {
  isAnimation.value = false;
};

// 组件缓存
// 虚拟任务栈
const virtualTaskStack = ref([props.mainComponentName]);
// 清空栈
const clearTask = () => {
  virtualTaskStack.value = [props.mainComponentName];
};
</script>

<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}

// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}

// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    // 新进入的页面往左移动100%
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    // 新进入的页面往左移动50%
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}

// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}

// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}

// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
