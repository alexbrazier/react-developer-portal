import reducer from '../loading';
import * as types from '../../constants/actionTypes';

describe('loading reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(false);
  });

  const trueTypes = [
    types.APP_UPDATE_REQUESTED,
    types.APPS_FETCH_REQUESTED,
    types.APP_USERS_FETCH_REQUESTED,
    types.USER_LOGIN_REQUESTED,
  ];

  trueTypes.forEach((type) => {
    it(`should handle ${type}`, () => {
      expect(reducer(undefined, {
        type,
      })).toEqual(true);
    });
  });


  const falseTypes = [
    types.APP_UPDATE_FAILED,
    types.APP_UPDATE_SUCCEEDED,
    types.APPS_FETCH_FAILED,
    types.APPS_FETCH_SUCCEEDED,
    types.APP_USERS_FETCH_FAILED,
    types.APP_USERS_FETCH_SUCCEEDED,
    types.USER_LOGIN_FAILED,
    types.USER_LOGIN_SUCCEEDED,
  ];

  falseTypes.forEach((type) => {
    it(`should handle ${type}`, () => {
      expect(reducer(undefined, {
        type,
      })).toEqual(false);
    });
  });
});
