import request from '@/utils/request';

// 请求图片数据列表
export const getPexelsList = (data) => {
  return request.get('/pexels/list', {
    params: data
  });
};
