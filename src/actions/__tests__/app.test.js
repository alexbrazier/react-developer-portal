import * as actions from '../app';
import * as types from '../../constants/actionTypes';

describe('app actions', () => {
  it('should create an action to get app users', () => {
    const appId = 'appId';
    const page = 'page';
    const expectedAction = {
      type: types.APP_USERS_FETCH_REQUESTED,
      appId,
      page,
    };
    expect(actions.getAppUsers(appId, page)).toEqual(expectedAction);
  });
});
