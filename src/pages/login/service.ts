import { request } from 'umi';
import md5 from 'js-md5';

// 通用统计接口
export function login(params: { password: string; username: string }) {
  return request(`${API_PREFIX}/auth/login`, {
    method: 'post',
    params: {
      username: params?.username,
      password: md5(params?.password),
    },
  });
}
