import {
  USER_LOGIN_REQUESTED,
  USER_LOGOUT,
  USER_SET,
} from '../constants/actionTypes';

export const login = user => ({
  type: USER_LOGIN_REQUESTED,
  user,
});

export const logout = () => ({
  type: USER_LOGOUT,
});

export const setUser = user => ({
  type: USER_SET,
  user,
});
