export const SET_USER = 'SET_USER';
export const SET_AUTH = 'SET_AUTH';

export const setUser = user => {
  return { type: SET_USER, user };
};

export const setAuth = auth => {
  return { type: SET_AUTH, auth };
};
