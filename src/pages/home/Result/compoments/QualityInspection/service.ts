import { request } from 'umi';

// 文件上传
export const uploadFile = (data: any) => {
  return request(`${API_PREFIX}/`, {
    data,
    method: 'post',
  });
};
