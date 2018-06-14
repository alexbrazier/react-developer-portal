import * as actions from '../user';
import * as types from '../../constants/actionTypes';

describe('user actions', () => {
  it('should create an action to login', () => {
    const user = 'user';
    const expectedAction = {
      type: types.USER_LOGIN_REQUESTED,
      user,
    };
    expect(actions.login(user)).toEqual(expectedAction);
  });

  it('should create an action to logout', () => {
    const expectedAction = {
      type: types.USER_LOGOUT,
    };
    expect(actions.logout()).toEqual(expectedAction);
  });

  it('should create an action to set user', () => {
    const expectedAction = {
      type: types.USER_SET,
    };
    expect(actions.setUser()).toEqual(expectedAction);
  });
});
