export const SET_USER = 'SET_USER';
export const SET_ADMIN = 'SET_ADMIN';
export const SET_AUTH = 'SET_AUTH';

export const setUser = user => {
  return { type: SET_USER, user };
};

export const setAdmin = admin => {
  return { type: SET_ADMIN, admin };
};

export const setAuth = auth => {
  return { type: SET_AUTH, auth };
};
