import moment from 'moment';
import type { ImmerReducer } from 'umi';
import type { Moment } from 'moment';

export interface IndexModelState {
  branchName: string;
  regionName: string;
  latitude: string[];
  gridName: string | undefined;
  step: number;
  date: Moment;
}

export interface IndexModelType {
  namespace: 'home';
  state: IndexModelState;
  reducers: {
    update: ImmerReducer<IndexModelState>;
  };
}

const IndexModel: IndexModelType = {
  namespace: 'home',
  state: {
    branchName: '',
    regionName: '',
    latitude: ['1'],
    gridName: undefined,
    step: 7,
    date: moment(),
  },

  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default IndexModel;
