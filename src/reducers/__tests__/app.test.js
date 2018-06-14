import reducer from '../app';
import * as types from '../../constants/actionTypes';

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle APP_USERS_FETCH_REQUESTED', () => {
    const appId = 'appId';
    const page = 'page';
    expect(reducer({ initial: 1 }, {
      type: types.APP_USERS_FETCH_REQUESTED,
      appId,
      page,
    })).toEqual({
      initial: 1,
      loading: true,
      appId,
      page,
    });
  });

  it('should handle APP_USERS_FETCH_SUCCEEDED', () => {
    const action = { test1: 1, test2: 2 };
    expect(reducer({ initial: 1 }, {
      type: types.APP_USERS_FETCH_SUCCEEDED,
      ...action,
    })).toEqual({
      initial: 1,
      ...action,
      loading: false,
    });
  });

  it('should handle APP_USERS_FETCH_FAILED', () => {
    const error = 'error';
    expect(reducer({ initial: 1 }, {
      type: types.APP_USERS_FETCH_FAILED,
      err: error,
    })).toEqual({
      error,
    });
  });
});
