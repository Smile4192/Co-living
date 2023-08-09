import { createSlice } from '@reduxjs/toolkit';

const viewedContacts = JSON.parse(
  localStorage.getItem('viewedContacts') ?? '{}',
);
const initialState = {
  viewedContacts,
  list: [],
  mappedList: {},
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setViewedContacts(state, { payload }) {
      const temp = { ...state.viewedContacts };
      if (!temp[payload.colivingID]) temp[payload.colivingID] = {};
      temp[payload.colivingID][payload.userID] = true;
      state.viewedContacts = temp;
    },
    setList(state, { payload }) {
      state.list = payload.list;
      state.mappedList = payload.list.reduce(
        (acc, item, idx) => ({
          ...acc,
          [item.id]: { idx: idx, isReady: false },
        }),
        {},
      );
      console.log('setList', state.mappedList);
    },
    setApplications(state, { payload }) {
      const data = payload.data.filter((item) => item.status !== 'Hidden');
      data.sort((a, b) => (a.timeSubmitted < b.timeSubmitted ? 1 : -1));
      state.list = state.list.map((item) => {
        if (item.id === payload.id) {
          item.applications = data;
          item.isReady = true;
        }
        return item;
      });
      state.mappedList = {
        ...state.mappedList,
        [payload.id]: { ...state.mappedList[payload.id], isReady: true },
      };
    },
    setStatus(state, { payload }) {
      const tempList = [...state.list];
      const cIndex = state.mappedList[payload.colivingID].idx;
      const tempApps = tempList[cIndex].applications;
      tempList[cIndex].applications = tempApps.map((app) => {
        if (app.userID === payload.userID) {
          app.status = payload.status;
        }
        return app;
      });
      state.list = tempList;
    },
  },
});

export const { setViewedContacts, setList, setApplications, setStatus } =
  applicationsSlice.actions;
export default applicationsSlice.reducer;
