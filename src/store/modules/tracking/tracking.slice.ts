import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserActive: false,
};

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    userIsActive: (state) => {
      state.isUserActive = true;
      console.log('userIsActive');
    },
    userIsInactive: (state) => {
      state.isUserActive = false;
      console.log('userIsInactive');
    },
  },
});

export const { userIsInactive, userIsActive } = trackingSlice.actions;
export default trackingSlice.reducer;
