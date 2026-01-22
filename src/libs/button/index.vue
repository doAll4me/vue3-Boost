<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      {
        'active:scale-105': isActiveAnim
      }
    ]"
    @click.stop="onBtnClick"
  >
    <!-- loading效果 -->
    <m-svg-icon v-if="loading" name="loading" class="w-2 h-2 animate-spin mr-1"></m-svg-icon>

    <!-- icon按钮 -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>

    <!-- 文字按钮 -->
    <slot v-else />
  </button>
</template>

<script>
// 公共组件 用常量统一管理事件名，避免魔法字符串和拼写错误。
const EMITS_CLICK = 'click';

// 1.构建type风格可选项  size大小可选项
// type可选项
const typeEnum = {
  primary: 'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800',
  main: 'text-white bg-main hover:bg-hover-main action:bg-main',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200'
};

// size可选项
const sizeEnum = {
  // 文字按钮
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  // icon按钮
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  // 小按钮_文字
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  // 小按钮_图标
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
};
</script>

<script setup>
import { computed } from 'vue';

// 2.通过props 让开发者控制按钮
const props = defineProps({
  // icon图标
  icon: String,
  // icon颜色
  iconColor: String,
  // icon图标类名
  iconClass: String,
  // 按钮风格
  type: {
    type: String,
    default: 'main',
    validator(val) {
      const keys = Object.keys(typeEnum);
      const res = keys.includes(val);
      if (!res) {
        throw new Error(`你的type必须是${keys.join('、')}中的一个`);
      }
      return res;
    }
  },
  // 大小风格
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'));
      const res = keys.includes(val);
      if (!res) {
        throw new Error(`你的size必须是${keys.join('、')}中的一个`);
      }
      return res;
    }
  },
  // 点击时是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  }
});

// 3.区分icon button 和text button
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size;
});

// 4.依据当前数据 实现视图

// 5.处理点击事件
const emits = defineEmits([EMITS_CLICK]);
const onBtnClick = () => {
  if (props.loading) return;
  emits(EMITS_CLICK);
};
</script>

<style lang="scss" scoped></style>
