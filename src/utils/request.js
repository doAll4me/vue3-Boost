import store from '@/store';
import axios from 'axios';

// console.log(import.meta.env.VITE_BASE_API);

const service = axios.create({
  // 根据项目状态自动切换服务地址（开发环境 / 生产环境）
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000
});

// 请求拦截器
service.interceptors.request.use(
  // 请求成功的回调函数
  (config) => {
    // 设置带有token的请求头
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    //添加icode
    config.headers.icode = 'helloqianduanxunlianying';
    //return出去的对象就是请求的配置对象
    return config;
  },
  // 请求失败的回调函数
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data;
    if (success) {
      // 直接返回res.data
      return data;
    }
    return Promise.reject(new Error(message));
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
