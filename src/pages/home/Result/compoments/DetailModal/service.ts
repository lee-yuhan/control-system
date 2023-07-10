import { request } from 'umi';

export const getDetailData = (params: any) => {
  return request(`${API_PREFIX}/x`, {
    params,
  });
};
