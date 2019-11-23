import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logoutUser }) => {
  return (
    <nav className='main-nav'>
      <Link to='/' className='navbar-logo'>
        dN
      </Link>
      <div className='navbar-list'>
        <Link
          to='/login'
          onClick={() => {
            logoutUser();
          }}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
