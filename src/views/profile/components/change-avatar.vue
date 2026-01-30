<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    ></m-svg-icon>

    <img :src="blob" ref="imgTarget" alt="" class="max-h-[50vh] w-auto object-contain" />

    <m-button class="mt-4 w-[80%] xl:1/2" :loading="loading" @click="onConfirmClick">确定</m-button>
  </div>
</template>

<script>
const EMITS_CLOSE = 'close';
const EMITS_CONFIRM = 'confirm';

// pc端配置对象
const pcOptions = {
  aspectRatio: 1
};

// 移动端配置对象
const mobileOptions = {
  //将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  //裁剪框固定纵横比:1:1
  aspectRatio: 1,
  //裁剪框不可移动
  cropBoxMovable: false,
  //不可调整裁剪框大小了
  cropBoxResizable: false
};
</script>

<script setup>
import { message } from '@/libs';
import { isMobileTerminal } from '@/utils/flexible';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { putProfile } from '../../../api/sys';
import { getOSSClient } from '../../../utils/sts';

const store = useStore();

const props = defineProps({
  blob: {
    type: String,
    required: true
  }
});

const emits = defineEmits([EMITS_CLOSE]);

// 关闭按钮点击事件
const close = () => {
  emits(EMITS_CLOSE);
};

// 图片裁剪
const imgTarget = ref(null);
let cropper = null;
onMounted(() => {
  cropper = new Cropper(imgTarget.value, isMobileTerminal.value ? mobileOptions : pcOptions);
});

// 确定按钮点击事件
const loading = ref(false);
const onConfirmClick = () => {
  loading.value = true;
  // 拿到裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // console.log(URL.createObjectURL(blob));
    putObjectToOSS(blob);
  });
};

// OSS上传
let ossClient;
const putObjectToOSS = async (file) => {
  if (!ossClient) {
    ossClient = await getOSSClient();
  }
  try {
    // 构建文件名字
    const fileTypeArr = file.type.split('/');
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${fileTypeArr[fileTypeArr.length - 1]}`;
    // 参数1 存放路径   参数2 filename
    const res = await ossClient.put(`images/${fileName}`, file);
    // console.log(res);
    onChangeProfile(res.url);
  } catch (error) {
    message(error, 'error');
  }
};

// 上传新头像到服务器
const onChangeProfile = async (avatar) => {
  // 更新本地数据
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar
  });

  // 更新服务器的数据
  await putProfile(store.getters.userInfo);

  // 更新头像成功后通知用户
  message('修改头像成功', 'success');
  loading.value = false;
  close();
};
</script>

<style lang="scss" scoped></style>
