import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';

export const rootReducer = combineReducers({
  auth,
  user
});

const getCredentials = () => {
  const credentials = localStorage.getItem('credentials');
  if (!credentials) return {};
  return JSON.parse(credentials);
};

export const initialState = getCredentials();
