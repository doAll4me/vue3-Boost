import request from '@/utils/request';
// 人类行为验证
export const getCaptcha = (data) => request.post('/sys/captcha', data);
