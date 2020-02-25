const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, action.user);
    default:
      return state;
  }
};

export default user;
