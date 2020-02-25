import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, MenuList } from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  admin: state.admin
});

const Navbar = ({ admin, logoutUser, logoutAdmin }) => {
  return (
    <MenuList className='nav'>
      <MenuItem>
        <Link
          className='nav-link'
          to={admin ? '/admin/login' : '/login'}
          onClick={() => {
            admin ? logoutAdmin() : logoutUser();
          }}
        >
          Logout
        </Link>
      </MenuItem>
      <p className='icon'>DateNight</p>
    </MenuList>
  );
};

export default connect(mapStateToProps)(Navbar);
