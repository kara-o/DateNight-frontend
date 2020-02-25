import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import admin from './admin';

export const rootReducer = combineReducers({
  auth,
  user,
  admin
});

const getCredentials = () => {
  const credentials = localStorage.getItem('credentials');
  if (!credentials) return {};
  return JSON.parse(credentials);
};

export const initialState = getCredentials();
