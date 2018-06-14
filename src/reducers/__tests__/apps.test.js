import reducer from '../apps';
import * as types from '../../constants/actionTypes';

describe('apps reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle APPS_FETCH_REQUESTED', () => {
    expect(reducer({ initial: 1 }, {
      type: types.APPS_FETCH_REQUESTED,
    })).toEqual({
      loading: true,
    });
  });

  it('should handle APPS_FETCH_SUCCEEDED', () => {
    const apps = ['a', 'b'];
    expect(reducer({ initial: 1 }, {
      type: types.APPS_FETCH_SUCCEEDED,
      apps,
    })).toEqual({
      loading: false,
      apps,
    });
  });

  it('should handle APPS_FETCH_FAILED', () => {
    const error = 'error';
    expect(reducer({ initial: 1 }, {
      type: types.APPS_FETCH_FAILED,
      err: error,
    })).toEqual({
      loading: false,
      error,
    });
  });

  it('should handle APP_UPDATE_TOGGLE', () => {
    const editingApp = 'editingApp';
    expect(reducer({ initial: 1 }, {
      type: types.APP_UPDATE_TOGGLE,
      app: editingApp,
    })).toEqual({
      initial: 1,
      editingApp,
    });
  });

  it('should handle APP_UPDATE_SUCCEEDED', () => {
    const apps = [{
      id: 1,
      test: 'hello',
      other: 'other',
    }, {
      id: 2,
      test: 'hello2',
      other: 'other',
    }];
    const app = { id: 2, test: 'new' };
    expect(reducer({ initial: 1, apps }, {
      type: types.APP_UPDATE_SUCCEEDED,
      app,
    })).toEqual({
      apps: [apps[0], { ...apps[1], ...app }],
    });
  });

  it('should handle APP_UPDATE_REQUESTED', () => {
    const editingApp = { a: 1 };
    expect(reducer({ initial: 1, editingApp }, {
      type: types.APP_UPDATE_REQUESTED,
    })).toEqual({
      initial: 1,
      editingApp: { ...editingApp, loading: true },
    });
  });

  it('should handle APP_UPDATE_FAILED', () => {
    const editingApp = { a: 1 };
    const error = 'err';
    expect(reducer({ initial: 1, editingApp }, {
      type: types.APP_UPDATE_FAILED,
      err: error,
    })).toEqual({
      initial: 1,
      editingApp: { ...editingApp, error },
    });
  });
});
