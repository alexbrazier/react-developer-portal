import { call, put, takeLatest } from 'redux-saga/effects';
import {
  APPS_FETCH_REQUESTED,
  APPS_FETCH_FAILED,
  APPS_FETCH_SUCCEEDED,
  APP_UPDATE_REQUESTED,
  APP_UPDATE_FAILED,
  APP_UPDATE_SUCCEEDED,
} from '../constants/actionTypes';
import * as API from '../libs/api';

export function* getApps() {
  try {
    const apps = yield call(API.getApps);
    yield put({ type: APPS_FETCH_SUCCEEDED, ...apps.data });
  } catch (e) {
    yield put({ type: APPS_FETCH_FAILED, err: e.message });
  }
}

export function* updateApp(action) {
  try {
    const app = yield call(API.updateApp, action.app);
    yield put({ type: APP_UPDATE_SUCCEEDED, ...app.data });
  } catch (e) {
    yield put({ type: APP_UPDATE_FAILED, err: e.message });
  }
}

export default function* root() {
  yield takeLatest(APPS_FETCH_REQUESTED, getApps);
  yield takeLatest(APP_UPDATE_REQUESTED, updateApp);
}
