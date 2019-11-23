import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ logoutUser }) => {
  return (
    <nav className='main-nav'>
      <NavLink to='/' className='navbar-logo'>
        dN
      </NavLink>
      <NavLink
        to='/login'
        onClick={() => {
          logoutUser();
        }}
      >
        Logout
      </NavLink>
    </nav>
  );
};

export default Navbar;
