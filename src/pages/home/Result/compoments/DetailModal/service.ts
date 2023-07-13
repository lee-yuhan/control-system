import { request } from 'umi';
import type { Moment } from 'moment';

export const getDetailData = (params: {
  custType?: string;
  date: string;
  latitude: string;
  mode: string;
  branchName?: string;
  regionName?: string;
}) => {
  return request(`${API_PREFIX}/stat/branch_contrast`, {
    params,
  });
};
