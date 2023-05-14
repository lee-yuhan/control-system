import type { ImmerReducer } from 'umi';

export interface IndexModelState {
  branchName: string;
  regionName: string;
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
