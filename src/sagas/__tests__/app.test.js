import { call, put, takeLatest } from 'redux-saga/effects';
import * as saga from '../app';
import * as types from '../../constants/actionTypes';
import * as API from '../../libs/api';

describe('app saga', () => {
  describe('getAppUsers', () => {
    it('should call API.getAppUsers with params', () => {
      const action = { page: 5, appId: 'appId' };
      const gen = saga.getAppUsers(action);
      const fakeApp = {
        data: {
          test: 1,
        },
      };
      const limit = API.DEFAULT_LIMIT;
      expect(gen.next().value).toEqual(call(API.getAppUsers, {
        appId: action.appId,
        offset: action.page * limit,
        limit,
      }));
      expect(gen.next(fakeApp).value).toEqual(put({
        type: types.APP_USERS_FETCH_SUCCEEDED,
        ...fakeApp.data,
        limit,
        page: action.page,
      }));
      expect(gen.next().done).toBe(true);
    });

    it('should put error if fails', () => {
      const action = undefined; // Cause error
      const gen = saga.getAppUsers(action);
      expect(gen.next().value).toEqual(put({
        type: types.APP_USERS_FETCH_FAILED,
        err: 'Cannot read property \'page\' of undefined',
      }));
      expect(gen.next().done).toBe(true);
    });
  });

  describe('root', () => {
    it('should call getAppUsers when users requested', () => {
      const gen = saga.default();
      expect(gen.next().value).toEqual(takeLatest(
        types.APP_USERS_FETCH_REQUESTED,
        saga.getAppUsers,
      ));
      expect(gen.next().done).toBe(true);
    });
  });
});
