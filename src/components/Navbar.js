import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <div>
      <h3>{props.currentUser.username}</h3>
      <Link
        to='/login'
        onClick={() => {
          props.logoutUser();
        }}
      >
        Logout
      </Link>
    </div>
  );
};

export default Navbar;
