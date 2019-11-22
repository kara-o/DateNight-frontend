import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <div>
      <Link
        to='/login'
        onClick={() => {
          props.logoutUser();
        }}
      >
        Logout
      </Link>
      <p>This is the Navbar</p>
    </div>
  );
};

export default Navbar;
