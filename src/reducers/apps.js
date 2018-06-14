import {
  APPS_FETCH_REQUESTED,
  APPS_FETCH_SUCCEEDED,
  APPS_FETCH_FAILED,
  APP_UPDATE_SUCCEEDED,
  APP_UPDATE_REQUESTED,
  APP_UPDATE_FAILED,
  APP_UPDATE_TOGGLE,
} from '../constants/actionTypes';

const apps = (state = {}, action) => {
  switch (action.type) {
    case APPS_FETCH_REQUESTED:
      return { loading: true };
    case APPS_FETCH_SUCCEEDED:
      return { apps: action.apps, loading: false };
    case APPS_FETCH_FAILED:
      return { loading: false, error: action.err };
    case APP_UPDATE_TOGGLE:
      return { ...state, editingApp: action.app };
    case APP_UPDATE_SUCCEEDED: {
      const update = action.app;
      const newApps = state.apps.map(a => (a.id === update.id ? { ...a, ...update } : a));
      return { apps: newApps };
    }
    case APP_UPDATE_REQUESTED:
      return { ...state, editingApp: { ...state.editingApp, loading: true } };
    case APP_UPDATE_FAILED:
      return {
        ...state,
        editingApp: { ...state.editingApp, error: action.err },
      };
    default:
      return state;
  }
};

export default apps;
