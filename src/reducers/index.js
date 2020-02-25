import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import admin from './admin';

const dateNightApp = combineReducers({
  auth,
  user,
  admin
});

export default dateNightApp;
