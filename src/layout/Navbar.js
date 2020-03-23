import React from 'react';
import { Link } from 'react-router-dom';
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
