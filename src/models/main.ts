import type { ImmerReducer } from 'umi';

export interface IndexModelState {
  branchName: string | undefined;
  regionName: string | undefined;
  latitude: string[];
  gridName: string | undefined;
  channelName: string | undefined;
  tagName: string | undefined;
}

export interface IndexModelType {
  namespace: 'main';
  state: IndexModelState;
  reducers: {
    update: ImmerReducer<IndexModelState>;
  };
}

const IndexModel: IndexModelType = {
  namespace: 'main',
  state: {
    branchName: undefined,
    regionName: undefined,
    latitude: ['1'],
    gridName: undefined,
    channelName: undefined,
    tagName: undefined,
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
