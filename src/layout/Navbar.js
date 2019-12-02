import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logoutUser, userData }) => {
  return (
    <nav className='nav'>
      <Link
        to={userData.admin ? '/admin/login' : '/login'}
        onClick={() => {
          logoutUser();
        }}
      >
        Logout
      </Link>
      <Link to={userData.admin ? '/admin' : '/'}>Home</Link>
    </nav>
  );
};

export default Navbar;
