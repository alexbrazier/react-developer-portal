import {
  USER_LOGIN_REQUESTED,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCEEDED,
  USER_LOGOUT,
  USER_SET,
} from '../constants/actionTypes';

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUESTED:
      return { loading: true };
    case USER_LOGIN_SUCCEEDED:
      return { ...action.user, loading: false };
    case USER_LOGIN_FAILED:
      return { loading: false, error: action.err };
    case USER_SET:
      return { ...action.user };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default user;
