const admin = (state = {}, action) => {
  console.log(action.admin);
  switch (action.type) {
    case 'SET_ADMIN':
      return Object.assign({}, { admin: action.admin });
    default:
      return state;
  }
};

export default admin;
