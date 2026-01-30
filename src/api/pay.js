import request from '@/utils/request';

// 获取vip支付数据
export const getVipPayList = () => request.get('/user/vip/pay/list');
