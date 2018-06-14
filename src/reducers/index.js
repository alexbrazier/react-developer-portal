import { combineReducers } from 'redux';
import user from './user';
import apps from './apps';
import app from './app';
import loading from './loading';

export default combineReducers({
  user,
  apps,
  app,
  loading,
});
