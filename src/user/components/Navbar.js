import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logoutUser }) => {
  return (
    <nav className='nav'>
      <Link
        to='/login'
        onClick={() => {
          logoutUser();
        }}
      >
        Logout
      </Link>
      <Link to='/' className='navbar-logo'>
        Home
      </Link>
    </nav>
  );
};

export default Navbar;
