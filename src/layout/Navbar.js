import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, MenuList } from '@material-ui/core';

const Navbar = ({ logoutUser, logoutAdmin, userData }) => {
  return (
    <MenuList className='nav'>
      <MenuItem>
        <Link
          className='nav-link'
          to={userData.admin ? '/admin/login' : '/login'}
          onClick={() => {
            userData.admin ? logoutAdmin() : logoutUser();
          }}
        >
          Logout
        </Link>
      </MenuItem>
      <p className='icon'>DateNight</p>
    </MenuList>
  );
};

export default Navbar;
