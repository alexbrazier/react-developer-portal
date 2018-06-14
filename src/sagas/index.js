import { all } from 'redux-saga/effects';
import user from './user';
import apps from './apps';
import app from './app';

export default function* root() {
  yield all([user(), apps(), app()]);
}
