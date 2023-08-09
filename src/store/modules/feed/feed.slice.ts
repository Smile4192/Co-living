import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pointer: 0,
  page: 1,
  pageSize: 10,
  type: 'colivings',
  current: null,
  filter: {},
  orderedList: [],
  list: {},
  typeOfDataLoading: 'NEW',
  isLoading: false,
  isReadyNext: false, //TODO
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    next(state) {
      state.pointer = state.pointer + 1;
      state.current =
        state.type === 'colivings'
          ? state.list[state.pointer]
          : state.list[state.pointer].residentProfile;
      if (state.pointer === state.list.length - 1) {
        state.page = state.page + 1;
        state.typeOfDataLoading = 'ADD';
      }
    },
    nextPage(state) {
      state.page = state.page + 1;
    },
    setType(state, { payload }: { payload: { type: string } }) {
      if (state.type !== payload.type) state.typeOfDataLoading = 'NEW';
      state.type = payload.type;
      state.pointer = 0;
      state.page = 1;
      state.filter = {};
    },
    setFilter(state, { payload }) {
      state.filter = payload.filter;
      state.typeOfDataLoading = 'NEW';
    },
    resetFilter(state) {
      state.filter = initialFilter;
    },
    addToList(state, { payload }) {
      state.orderedList = [...new Set([...state.orderedList, ...payload.data])];
      const newValue = payload.data.reduce(
        (acc, i) => ({ ...acc, [i]: { isReady: false } }),
        {},
      );
      state.list = { ...newValue, ...state.list };
      console.log('addToList:', state.orderedList, state.list);
      state.typeOfDataLoading = 'DONE';
    },
    newList(state, { payload }) {
      state.pointer = 0;
      state.page = 1;
      state.orderedList = payload.data;
      if (payload.data.length !== 1)
        state.list = state.orderedList.reduce(
          (acc, i) => ({ ...acc, [i]: { isReady: false } }),
          {},
        );
      state.typeOfDataLoading = 'DONE';
      console.log('newList:', state.orderedList, state.list);
    },
    setLoadedItem(state, { payload }) {
      state.list = { ...state.list, ...payload.item };
      console.log('LIST: ', state.list);
    },
    reLoadItem(state, { payload }) {
      state.list[payload.id].isReady = false;
    },
    setTypeOfDataLoading(state, { payload }) {
      state.typeOfDataLoading = payload.type;
    },
  },
});

export const {
  next,
  nextPage,
  setType,
  setFilter,
  resetFilter,
  addToList,
  newList,
  setLoadedItem,
  reLoadItem,
  setTypeOfDataLoading,
} = feedSlice.actions;
export default feedSlice.reducer;
