import moment from 'moment';
import { Moment } from 'moment';
import { request } from 'umi';
import { data } from './mock';
import { omit } from 'lodash';
// import { IAvgScore, IAllCount, IGroupBy, IStoreList } from "./types";

export type IListItem = typeof data;
interface IList extends AjaxRes<IListItem[]> {
  total: number;
  current: number;
  page_size: number;
}

export const getList = (params: {
  start: Moment;
  end: Moment;
  page?: number;
  pageSize?: number;
  regionName?: string;
  branchName?: string;
}): Promise<IList> => {
  return request(`${API_PREFIX}/kpi/score`, {
    params: {
      ...omit(params, ['start', 'end']),
      start: moment(params.start).format('YYYY-MM-DD'),
      end: moment(params.end).format('YYYY-MM-DD'),
    },
  });
};
