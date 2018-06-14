import * as actions from '../apps';
import * as types from '../../constants/actionTypes';

describe('apps actions', () => {
  it('should create an action to get apps', () => {
    const expectedAction = {
      type: types.APPS_FETCH_REQUESTED,
    };
    expect(actions.getApps()).toEqual(expectedAction);
  });

  it('should create an action to update app', () => {
    const expectedAction = {
      type: types.APP_UPDATE_REQUESTED,
    };
    expect(actions.updateApp()).toEqual(expectedAction);
  });

  it('should create an action to edit app', () => {
    const expectedAction = {
      type: types.APP_UPDATE_TOGGLE,
    };
    expect(actions.editApp()).toEqual(expectedAction);
  });
});
