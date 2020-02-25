const auth = (state = {}, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return Object.assign({}, action.auth);
    default:
      return state;
  }
};

export default auth;
