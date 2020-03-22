import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, MenuList } from '@material-ui/core';
import Button from './Button';
import Avatar from '@material-ui/core/Avatar';

const Navbar = ({ logoutUser, logoutAdmin, userData }) => {
  const renderInitials = () => {
    if (!userData.admin) {
      return (
        <span>
          {`${userData.user.first_name.slice(0, 1)}` +
            `${userData.user.last_name.slice(0, 1)}`}
        </span>
      );
    } else {
      return 'ADMIN';
    }
  };

  return (
    <nav>
      {userData && !userData.admin ? (
        <>
          <Link to={`/`}>Home</Link>
          <Link to={`/requests/new`}>Make A New Request!</Link>
        </>
      ) : null}
      {userData && userData.admin ? (
        <div>
          <Link to='/admin/'>Requests</Link>
          <span>|</span>
          <Link to='/admin/itinerary_packages'>Packages</Link>
        </div>
      ) : null}
      <Link
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
