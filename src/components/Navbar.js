import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  const loggedIn = !!props.currentUser.id;

  return (
    <div>
      {loggedIn ? <button onClick={props.handleLogout}>Logout</button> : null}
    </div>
  );
};

export default Navbar;
