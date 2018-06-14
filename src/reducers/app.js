import {
  APP_USERS_FETCH_REQUESTED,
  APP_USERS_FETCH_SUCCEEDED,
  APP_USERS_FETCH_FAILED,
} from '../constants/actionTypes';

const apps = (state = {}, action) => {
  switch (action.type) {
    case APP_USERS_FETCH_REQUESTED:
      return {
        ...state,
        loading: true,
        appId: action.appId,
        page: action.page,
      };
    case APP_USERS_FETCH_SUCCEEDED: {
      const { type, ...partAction } = action;
      return { ...state, ...partAction, loading: false };
    }
    case APP_USERS_FETCH_FAILED:
      return { error: action.err };
    default:
      return state;
  }
};

export default apps;
