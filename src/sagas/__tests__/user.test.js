import { call, put, takeLatest } from 'redux-saga/effects';
import * as saga from '../user';
import * as types from '../../constants/actionTypes';
import * as API from '../../libs/api';

describe('user saga', () => {
  describe('login', () => {
    it('should call API.login with params', () => {
      const action = { user: { email: 'email' } };
      const gen = saga.login(action);
      const fakeUser = {
        data: {
          accessToken: 'token',
        },
      };
      expect(gen.next().value).toEqual(call(API.login, action.user));
      expect(gen.next(fakeUser).value).toEqual(put({
        type: types.USER_LOGIN_SUCCEEDED,
        user: { email: 'email', accessToken: 'token' },
      }));
      expect(gen.next().value).toEqual(call(
        [localStorage, 'setItem'],
        'accessToken', 'token',
      ));
      expect(gen.next().done).toBe(true);
    });

    it('should put error if fails', () => {
      const action = undefined;
      const gen = saga.login(action);
      expect(gen.next().value).toEqual(put({
        type: types.USER_LOGIN_FAILED,
        err: 'Cannot read property \'user\' of undefined',
      }));
      expect(gen.next().done).toBe(true);
    });
  });

  describe('removeAccessToken', () => {
    it('should remove accessToken from localStorage', () => {
      const gen = saga.removeAccessToken();
      expect(gen.next().value).toEqual(call(
        [localStorage, 'removeItem'],
        'accessToken',
      ));
      expect(gen.next().done).toBe(true);
    });
  });

  describe('logout', () => {
    it('should put USER_LOGOUT', () => {
      const gen = saga.logout();
      expect(gen.next().value).toEqual(put({
        type: types.USER_LOGOUT,
      }));
      expect(gen.next().done).toBe(true);
    });
  });

  describe('root', () => {
    it('should call sagas when users requested', () => {
      const gen = saga.default();
      expect(gen.next().value).toEqual(takeLatest(
        types.USER_LOGIN_REQUESTED,
        saga.login,
      ));

      expect(gen.next().value).toEqual(takeLatest(
        types.USER_LOGOUT,
        saga.removeAccessToken,
      ));

      expect(gen.next().value).toEqual(takeLatest(
        types.APP_UPDATE_FAILED,
        saga.logout,
      ));

      expect(gen.next().value).toEqual(takeLatest(
        types.APPS_FETCH_FAILED,
        saga.logout,
      ));

      expect(gen.next().value).toEqual(takeLatest(
        types.APP_USERS_FETCH_FAILED,
        saga.logout,
      ));

      expect(gen.next().done).toBe(true);
    });
  });
});
