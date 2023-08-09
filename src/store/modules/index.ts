import { combineReducers } from 'redux';
import baseApi from '@/api/base.api';
import theme from './theme/theme.slice';
import auth from './auth/auth.slice';
import feed from './feed/feed.slice';
import tracking from './tracking/tracking.slice';
import applications from './applications/applications.slice';

export default combineReducers({
  theme,
  auth,
  tracking,
  feed,
  applications,
  [baseApi.reducerPath]: baseApi.reducer,
});
