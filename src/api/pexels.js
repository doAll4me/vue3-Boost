import request from '@/utils/request';

// 请求图片数据列表
export const getPexelsList = (data) => {
  return request.get('/pexels/list', {
    params: data
  });
};

// search提示词
export const getHint = (q) => {
  return request.get('/pexels/hint', { params: { q } });
};

// 获取推荐主题
export const getThemes = () => {
  return request.get('/pexels/themes');
};

// 获取指定id的图片数据
export const getPexelsFromId = (id) => {
  return request.get(`/pexels/${id}`);
};
