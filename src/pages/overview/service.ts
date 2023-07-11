import moment from 'moment';
import { Moment } from 'moment';
import { request } from 'umi';
import { data } from './mock';
import { omit } from 'lodash';
// import { IAvgScore, IAllCount, IGroupBy, IStoreList } from "./types";

export type IListItem = typeof data;
interface IList {
  records: IListItem[];
  total: number;
  current: number;
  size: number;
}

export const getList = (params: {
  start: Moment;
  end: Moment;
  page?: number;
  pageSize?: number;
  regionName?: string;
  branchName?: string;
}): Promise<IList> => {
  return request(`${API_PREFIX}/stat/rawData`, {
    params: {
      ...omit(params, ['start', 'end', 'pageSize', 'page']),
      startDate: moment(params?.start)?.format('YYYY-MM-DD'),
      size: params?.pageSize,
      current: params?.page,
      endDate: moment(params?.end)?.format('YYYY-MM-DD'),
    },
  });
};
