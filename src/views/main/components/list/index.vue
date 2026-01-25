<template>
  <div>
    <!-- 瀑布流效果 -->
    <!-- data数据源   nodeKey唯一标识   column渲染列数   picturePreReading图片是否需要预渲染 -->
    <m-waterfall :data="pexelsList" :nodeKey="id" :column="5" :picturePreReading="true">
      <!-- 插槽：一个插槽对应一个item -->
      <template v-slot="{ item, width }">
        <item-vue :data="item"></item-vue>
      </template>
    </m-waterfall>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getPexelsList } from '../../../../api/pexels';
import itemVue from './item.vue';
// 数据
const pexelsList = ref([]);
// 请求参数
const query = {
  page: 1,
  size: 20
};
const getPexelsData = async () => {
  let res = await getPexelsList(query);
  // console.log(res.list);
  pexelsList.value = res.list;
};
getPexelsData();
</script>

<style lang="scss" scoped></style>
