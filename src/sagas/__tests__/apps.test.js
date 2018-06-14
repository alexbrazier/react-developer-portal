import { call, put, takeLatest } from 'redux-saga/effects';
import * as saga from '../apps';
import * as types from '../../constants/actionTypes';
import * as API from '../../libs/api';

describe('apps saga', () => {
  describe('getApps', () => {
    it('should call API.getApps with params', () => {
      const gen = saga.getApps();
      const fakeApp = {
        data: {
          test: 1,
        },
      };
      expect(gen.next().value).toEqual(call(API.getApps));
      expect(gen.next(fakeApp).value).toEqual(put({
        type: types.APPS_FETCH_SUCCEEDED,
        ...fakeApp.data,
      }));
      expect(gen.next().done).toBe(true);
    });

    it('should put error if fails', () => {
      const gen = saga.getApps();
      gen.next();
      expect(gen.next().value).toEqual(put({
        type: types.APPS_FETCH_FAILED,
        err: 'Cannot read property \'data\' of undefined',
      }));
      expect(gen.next().done).toBe(true);
    });
  });

  describe('updateApp', () => {
    it('should call API.updateApp with params', () => {
      const action = { app: 'app' };
      const gen = saga.updateApp(action);
      const fakeApp = {
        data: {
          test: 1,
        },
      };
      expect(gen.next().value).toEqual(call(API.updateApp, action.app));
      expect(gen.next(fakeApp).value).toEqual(put({
        type: types.APP_UPDATE_SUCCEEDED,
        ...fakeApp.data,
      }));
      expect(gen.next().done).toBe(true);
    });

    it('should put error if fails', () => {
      const action = undefined;
      const gen = saga.updateApp(action);
      expect(gen.next().value).toEqual(put({
        type: types.APP_UPDATE_FAILED,
        err: 'Cannot read property \'app\' of undefined',
      }));
      expect(gen.next().done).toBe(true);
    });
  });

  describe('root', () => {
    it('should call sagas when users requested', () => {
      const gen = saga.default();
      expect(gen.next().value).toEqual(takeLatest(
        types.APPS_FETCH_REQUESTED,
        saga.getApps,
      ));

      expect(gen.next().value).toEqual(takeLatest(
        types.APP_UPDATE_REQUESTED,
        saga.updateApp,
      ));
      expect(gen.next().done).toBe(true);
    });
  });
});
