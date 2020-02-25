export const SET_USER = 'SET_USER';
export const SET_ADMIN = 'SET_ADMIN';
export const SET_AUTH = 'SET_AUTH';

export const setUser = user => {
  return { type: SET_USER, user };
};

export const setAdmin = () => {
  return { type: SET_ADMIN };
};

export const setAuth = auth => {
  console.log(`${auth}`);
  return { type: SET_AUTH, auth };
};
