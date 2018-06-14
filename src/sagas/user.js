import { call, put, takeLatest } from 'redux-saga/effects';
import {
  USER_LOGIN_REQUESTED,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCEEDED,
  USER_LOGOUT,
  APP_UPDATE_FAILED,
  APPS_FETCH_FAILED,
  APP_USERS_FETCH_FAILED,
} from '../constants/actionTypes';
import * as API from '../libs/api';

export function* login(action) {
  try {
    const details = action.user;
    const user = yield call(API.login, details);
    yield put({
      type: USER_LOGIN_SUCCEEDED,
      user: { email: details.email, ...user.data },
    });
    yield call([localStorage, 'setItem'], 'accessToken', user.data.accessToken);
  } catch (e) {
    yield put({ type: USER_LOGIN_FAILED, err: e.message });
  }
}

export function* removeAccessToken() {
  yield call([localStorage, 'removeItem'], 'accessToken');
}

export function* logout() {
  yield put({ type: USER_LOGOUT });
}

export default function* root() {
  yield takeLatest(USER_LOGIN_REQUESTED, login);
  yield takeLatest(USER_LOGOUT, removeAccessToken);
  // If something goes wrong let's just be safe and logout for now
  yield takeLatest(APP_UPDATE_FAILED, logout);
  yield takeLatest(APPS_FETCH_FAILED, logout);
  yield takeLatest(APP_USERS_FETCH_FAILED, logout);
}
