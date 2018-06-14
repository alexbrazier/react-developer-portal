import {
  APPS_FETCH_REQUESTED,
  APP_UPDATE_REQUESTED,
  APP_UPDATE_TOGGLE,
} from '../constants/actionTypes';

export const getApps = () => ({
  type: APPS_FETCH_REQUESTED,
});

export const updateApp = app => ({
  type: APP_UPDATE_REQUESTED,
  app,
});

export const editApp = app => ({
  type: APP_UPDATE_TOGGLE,
  app,
});
