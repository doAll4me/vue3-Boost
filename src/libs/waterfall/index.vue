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
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  getAllImg,
  getImgElements,
  getMaxHeight,
  getMinHeight,
  getMinHeightColumn,
  onComplateImgs
} from './utils';
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
    // console.log('itemHeights(inside then):', itemHeights);
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
    item._style.left = getItemLeft();
    // top
    item._style.top = getItemTop();

    // 加了item的列的高度需要增加
    increasingHeight(index);
  });

  // 容器的高度也需要增加:容器的高度===max的列高
  containerHeight.value = getMaxHeight(columnHeightObj.value);
};

// 在组件销毁时，清除所有item的_style
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style;
  });
});

// 返回下一个item的left
const getItemLeft = () => {
  //拿到最小高度的列
  const column = getMinHeightColumn(columnHeightObj.value);
  // column是索引，同时对应了该列前面还有多少列，有多少列就要乘多少个宽度
  return column * (columnWidth.value + props.columnSpacing) + containerLeft.value;
  // 前面已经有多少列 × （每列占的宽度）+容器的左边距===当前item的左边距
};

// 返回下一个item的top
const getItemTop = () => {
  //拿到列对象里的最小高度，就是当前item的top值
  return getMinHeight(columnHeightObj.value);
};

// 指定列高度自增
const increasingHeight = (index) => {
  // 得到高度最小的列（最小的列才会加item，才需要增加高度
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value);
  // 该列增高(加上所加item的高度，以及行间距)
  columnHeightObj.value[minHeightColumn] += itemHeights[index] + props.rowSpacing;
};

// 触发item计算高度
watch(
  () => props.data,
  (newVal) => {
    // 防止组件还没加载完
    nextTick(() => {
      // 每次获取到新数据 都要重新构建高度记录
      const resetColumnHeight = newVal.every((item) => !item._style);
      if (resetColumnHeight) {
        useColumnHeightObj();
      }

      if (props.picturePreReading) {
        //如果需要图片预加载
        waitImgComplate();
      } else {
        // 如果不需要图片预加载
        useItemHeight();
      }
    });
  },
  { deep: true, immediate: true }
);

// 重新构建瀑布流（重新渲染
const reset = () => {
  // 设置定时器再计算列宽 再渲染，不然一切换设备就计算会出错
  setTimeout(() => {
    //重新计算列宽
    useColumnWidth();
    // 重置item的定位数据
    props.data.forEach((item) => {
      delete item._style;
    });
  }, 200);
};

// 监听column列数的变化（切换移动端pc端
watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      columnWidth.value = 0; //初始化item宽度
      // 重新渲染item(数据改变后 视图改变后)
      // 重新计算列宽
      reset(); //反复切换后列宽会不稳定的更改
    } else {
      // 不需要图片预加载时，直接使用浏览器返回的图片高度和宽度计算
      // 所以不用自己计算图片的宽高，可以直接reset
      reset();
    }
  }
);
</script>

<style lang="scss" scoped></style>
