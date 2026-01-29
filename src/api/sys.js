import request from '@/utils/request';
// 人类行为验证
export const getCaptcha = (data) => request.post('/sys/captcha', data);

// 登录请求
export const loginUser = (data) => request.post('/sys/login', data);

// 注册请求
export const registerUser = (data) => request.post('/sys/register', data);

// 获取用户信息
export const getProfile = () => request.get('/user/profile');
