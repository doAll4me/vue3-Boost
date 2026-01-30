import { getSts } from '@/api/sys';
import OSS from 'ali-oss';
import { BUCKET, REGION } from '../constants';

export const getOSSClient = async () => {
  const res = await getSts();
  // console.log(res);
  return new OSS({
    // bucket存储桶所在区域
    region: REGION,
    // id
    accessKeyId: res.Credentials.AccessKeyId,
    // secret
    accessKeySecret: res.Credentials.AccessKeySecret,
    // token
    stsToken: res.Credentials.SecurityToken,
    // bucket名字
    bucket: BUCKET,

    // 刷新token（token过期后自动调用
    refreshSTSToken: async () => {
      const res = await getSts();
      return {
        accessKeyId: res.Credentials.AccessKeyId,
        accessKeySecret: res.Credentials.AccessKeySecret,
        stsToken: res.Credentials.SecurityToken
      };
    },
    // 刷新token的时间间隔 5000ms
    refreshSTSTokenInterval: 5 * 1000
  });
};
