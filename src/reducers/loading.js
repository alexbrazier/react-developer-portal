import {
  APPS_FETCH_REQUESTED,
  APPS_FETCH_SUCCEEDED,
  APPS_FETCH_FAILED,
  APP_UPDATE_SUCCEEDED,
  APP_UPDATE_REQUESTED,
  APP_UPDATE_FAILED,
  APP_USERS_FETCH_FAILED,
  APP_USERS_FETCH_REQUESTED,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUESTED,
  USER_LOGIN_SUCCEEDED,
  APP_USERS_FETCH_SUCCEEDED,
} from '../constants/actionTypes';

const apps = (state = false, action) => {
  switch (action.type) {
    case APP_UPDATE_REQUESTED:
    case APPS_FETCH_REQUESTED:
    case APP_USERS_FETCH_REQUESTED:
    case USER_LOGIN_REQUESTED:
      return true;
    case APPS_FETCH_FAILED:
    case APPS_FETCH_SUCCEEDED:
    case APP_UPDATE_SUCCEEDED:
    case APP_UPDATE_FAILED:
    case APP_USERS_FETCH_FAILED:
    case APP_USERS_FETCH_SUCCEEDED:
    case USER_LOGIN_FAILED:
    case USER_LOGIN_SUCCEEDED:
      return false;
    default:
      return state;
  }
};

export default apps;
