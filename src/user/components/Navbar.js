import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logoutUser, userData }) => {
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
        to={userData && userData.user.first_name ? '/login' : '/admin/login'}
        className='navbar-logo'
      >
        Home
      </Link>
    </nav>
  );
};

export default Navbar;
