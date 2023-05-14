import type { ImmerReducer } from 'umi';

export interface IndexModelState {
  themeChangeTag: number;
}

export interface IndexModelType {
  namespace: 'common';
  state: IndexModelState;
  reducers: {
    update: ImmerReducer<IndexModelState>;
    changeTheme: ImmerReducer<IndexModelState>;
  };
}

const IndexModel: IndexModelType = {
  namespace: 'common',
  state: {
    themeChangeTag: 1,
  },

  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeTheme(state) {
      return {
        ...state,
        themeChangeTag: state.themeChangeTag + 1,
      };
    },
  },
};

export default IndexModel;
