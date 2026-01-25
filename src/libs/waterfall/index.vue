<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{
      height: containerHeight + 'px'
    }"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 加载中 -->
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { getAllImg, getImgElements, onComplateImgs } from './utils';
const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    type: Number,
    default: 2
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20
  },
  // 是否需要预渲染
  picturePreReading: {
    type: Boolean,
    default: true
  }
});

// 计算容器总高度=最高的一列的高度
const containerHeight = ref(0);
// 计算每列内容的高度(五列，每列对应一个  所在列key  和  对应的列高value  )
const columnHeightObj = ref({});
// 记录每列内容高度的函数
const useColumnHeightObj = () => {
  columnHeightObj.value = {};
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0; //初始化 默认列高为0
  }
};

// 计算列宽（总容器宽度/列数量
// 容器总宽度(不包含border、margin和padding)
const containerTarget = ref(null); //container实例对象
const containerWidth = ref(0); //container宽度
const containerLeft = ref(0); //container左边距
// 计算容器宽度的函数
const useContainerWidth = () => {
  // 解构返回的style对象中的paddingLeft和paddingRight
  const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value, null);
  // console.log(getComputedStyle(containerTarget.value, null));

  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft);
  // 容器宽度
  containerWidth.value =
    containerTarget.value.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
};

// 列宽=（容器宽度-列间距宽度）/列数
const columnWidth = ref(0);
// 列间距的合计
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing;
});
// 计算列宽函数
const useColumnWidth = () => {
  useContainerWidth(); //计算容器宽度
  //计算列宽
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column;
  // console.log(columnWidth.value);
};

onMounted(() => {
  //在元素挂载后（渲染后）进行列宽计算
  useColumnWidth();
});

// item高度集合
let itemHeights = [];
// 监听图片加载完成(需要图片预加载到本地)
const waitImgComplate = () => {
  itemHeights = [];
  // 获取所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')];
  // console.log(itemElements);

  // 获取元素img标签
  let imgElements = getImgElements(itemElements);
  // console.log(imgElements);

  // 监听图片是否加载完成
  // 获取img的图片
  const allImgs = getAllImg(imgElements);
  // console.log(allImgs);

  // 等待图片加载完成
  onComplateImgs(allImgs).then(() => {
    // 图片加载完成后，依次计算item的高度
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight);
    });
    console.log('itemHeights(inside then):', itemHeights);
    // 渲染位置
    useItemLocation();
  });
  // console.log('itemElements:', itemElements.length);
  // console.log('imgElements:', imgElements.length);
  // console.log('allImgs:', allImgs);
};

// 不需要图片预加载 直接计算item高度
const useItemHeight = () => {
  itemHeights = [];
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')];
  // 计算元素高度
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight);
  });
  // 渲染位置
  useItemLocation();
};

// 渲染位置函数
const useItemLocation = () => {
  // console.log(itemHeights);
  // 遍历数据
  props.data.forEach((item, index) => {
    // 避免重复计算
    // 如果当前item已经有了_style 就不需要重新计算了
    if (item._style) {
      return;
    }
    // 生成_style属性
    item._style = {};
    // 计算组件应该在的位置
    // left
    item._style.left =
      // top
      item._style.top;
  });
};

// 返回下一个item的left
const getItemLeft=()=>{
  
}

// 触发item计算高度
watch(
  () => props.data.length,
  async (len) => {
    if (!len) return; //没数据就return
    if (!columnWidth.value) return; //没数据就return

    await nextTick(); //防止组件还没加载完

    if (props.picturePreReading) {
      //如果需要图片预加载
      await waitImgComplate();
    } else {
      // 如果不需要图片预加载
      useItemHeight();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
