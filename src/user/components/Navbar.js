import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logoutUser, currentUser }) => {
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
      <Link
        to={currentUser && currentUser.admin ? '/admin-home' : '/'}
        className='navbar-logo'
      >
        Home
      </Link>
    </nav>
  );
};

export default Navbar;
