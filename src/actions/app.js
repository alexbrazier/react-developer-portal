import { APP_USERS_FETCH_REQUESTED } from '../constants/actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const getAppUsers = (appId, page) => ({
  type: APP_USERS_FETCH_REQUESTED,
  appId,
  page,
});
