import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logoutUser, logoutAdmin, userData }) => {
  return (
    <nav className='nav'>
      <Link
        to={userData.admin ? '/admin/login' : '/login'}
        onClick={() => {
          userData.admin ? logoutAdmin() : logoutUser();
        }}
      >
        Logout
      </Link>
      <Link to={userData.admin ? '/admin' : '/'}>Home</Link>
    </nav>
  );
};

export default Navbar;
