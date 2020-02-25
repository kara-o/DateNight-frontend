const admin = (state = false, action) => {
  switch (action.type) {
    case 'SET_ADMIN':
      return !state;
    default:
      return state;
  }
};

export default admin;
