import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, MenuList } from '@material-ui/core';
import Button from './Button';
import Avatar from '@material-ui/core/Avatar';

const Navbar = ({ logoutUser, logoutAdmin, userData }) => {
  const renderInitials = () => {
    if (!userData.admin) {
      return (
        <span className='icon-span'>
          {`${userData.user.first_name.slice(0, 1)}` +
            `${userData.user.last_name.slice(0, 1)}`}
        </span>
      );
    } else {
      return 'ADMIN';
    }
  };

  return (
    <nav className='nav'>
      {/* <p className='icon'>DateNight</p> */}
      {/* <Link
        className='avatar link'
        to={userData && userData.admin ? '/admin' : '/'}
      >
        <Avatar className='avatar'>{renderInitials()}</Avatar>
      </Link> */}
      {userData && !userData.admin ? (
        <>
          <Link className='nav-link' to={`/`}>
            Home
          </Link>
          <Link className='nav-link' to={`/requests/new`}>
            Make A New Request!
          </Link>
        </>
      ) : null}
      {userData && userData.admin ? (
        <div className='nav-options'>
          <Link className='nav-link' to='/admin/'>
            Requests
          </Link>
          <span className='nav-spacer'>|</span>
          <Link className='nav-link' to='/admin/itinerary_packages'>
            Packages
          </Link>
        </div>
      ) : null}
      <Link
        className='nav-link'
        to={userData.admin ? '/admin/login' : '/login'}
        onClick={() => {
          userData.admin ? logoutAdmin() : logoutUser();
        }}
      >
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
