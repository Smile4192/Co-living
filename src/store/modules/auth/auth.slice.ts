import authApi from '@/api/auth.api';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: getToken(),
};
function getToken() {
  const hashString = window.location.hash;
  console.log(hashString);
  if (hashString === '') {
    const token = localStorage.getItem('accessToken');
    const issueTime = localStorage.getItem('issueTime');
    if (token !== null && issueTime !== null) {
      // implement token expiration detection later
      const expirationNotice = parseInt(issueTime) + 14 * 86400000;
      if (Date.now() > expirationNotice) {
        return null;
      }
      return token;
    } else {
      return null;
    }
  } else {
    const token = hashString.split('&')[0].split('=')[1];
    console.log(token);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('issueTime', Date.now().toString());

    return token;
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      if (state.token) {
        state.token = null;
        state.user = null;
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          console.log('extraR', payload);
          localStorage.setItem('userToken', payload.token);
          localStorage.setItem('userName', payload.user.first_name);
          state.token = payload.token;
          state.user = payload.user;
        },
      )
      .addMatcher(
        authApi.endpoints.loginEmail.matchFulfilled,
        (state, { payload }) => {
          console.log('extraR', payload);
          localStorage.setItem('userToken', payload.token);
          localStorage.setItem('userName', payload.user.first_name);
          state.token = payload.token;
          state.user = payload.user;
        },
      );
  },
});

export const selectUser = (state) => state.auth;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
