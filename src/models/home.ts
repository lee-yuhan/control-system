import type { ImmerReducer } from 'umi';

export interface IndexModelState {
  branchName: string;
  regionName: string;
  latitude: string[];
  gridName: string | undefined;
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
