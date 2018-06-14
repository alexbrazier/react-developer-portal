import reducer from '../user';
import * as types from '../../constants/actionTypes';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle USER_LOGIN_REQUESTED', () => {
    expect(reducer({ initial: 1 }, {
      type: types.USER_LOGIN_REQUESTED,
    })).toEqual({
      loading: true,
    });
  });

  it('should handle USER_LOGIN_SUCCEEDED', () => {
    const user = { a: 'user' };
    expect(reducer({ initial: 1 }, {
      type: types.USER_LOGIN_SUCCEEDED,
      user,
    })).toEqual({
      loading: false,
      ...user,
    });
  });

  it('should handle USER_LOGIN_FAILED', () => {
    const error = 'error';
    expect(reducer({ initial: 1 }, {
      type: types.USER_LOGIN_FAILED,
      err: error,
    })).toEqual({
      loading: false,
      error,
    });
  });

  it('should handle USER_SET', () => {
    const user = { a: 'user' };
    expect(reducer({ initial: 1 }, {
      type: types.USER_SET,
      user,
    })).toEqual({
      ...user,
    });
  });

  it('should handle USER_LOGOUT', () => {
    expect(reducer({ initial: 1 }, {
      type: types.USER_LOGOUT,
    })).toEqual({});
  });
});
