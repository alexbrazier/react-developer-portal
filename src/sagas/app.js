import { call, put, takeLatest } from 'redux-saga/effects';
import {
  APP_USERS_FETCH_REQUESTED,
  APP_USERS_FETCH_SUCCEEDED,
  APP_USERS_FETCH_FAILED,
} from '../constants/actionTypes';
import * as API from '../libs/api';

export function* getAppUsers(action) {
  try {
    const limit = API.DEFAULT_LIMIT;
    const { page } = action;
    const offset = page * limit;
    const app = yield call(API.getAppUsers, {
      appId: action.appId,
      offset,
      limit,
    });
    yield put({
      type: APP_USERS_FETCH_SUCCEEDED, ...app.data, limit, page,
    });
  } catch (e) {
    yield put({ type: APP_USERS_FETCH_FAILED, err: e.message });
  }
}

export default function* root() {
  yield takeLatest(APP_USERS_FETCH_REQUESTED, getAppUsers);
}
