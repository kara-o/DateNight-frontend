import React from 'react';
import MyLink from './MyLink';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navbar: {
    gridArea: 'navbar'
  }
});

const Navbar = ({ logoutUser, logoutAdmin, userData }) => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      {userData && !userData.admin ? (
        <>
          <MyLink destination={`/`}>Home</MyLink>
          <span> | </span>
          <MyLink destination={`/requests/new`}>Make A New Request!</MyLink>
          <span> | </span>
        </>
      ) : null}
      {userData && userData.admin ? (
        <div>
          <MyLink destination='/admin/'>Requests</MyLink>
          <span> | </span>
          <MyLink destination='/admin/itinerary_packages'>Packages</MyLink>
          <span> | </span>
        </div>
      ) : null}
      <MyLink
        destination={userData.admin ? '/admin/login' : '/login'}
        onClick={() => {
          userData.admin ? logoutAdmin() : logoutUser();
        }}
      >
        Logout
      </MyLink>
    </nav>
  );
};

export default Navbar;
