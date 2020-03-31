import React from 'react';
import MyLink from './MyLink';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navbar: {
    gridArea: 'navbar',
    display: 'grid',
    gridTemplateColumns:
      '[col1-start] 1fr [col1-end col2-start] 1fr [col2-end col3-start] 1fr [col3-end]',
    gridTemplateRows: 'auto',
    justifyItems: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E8E8E8',
    position: 'relative',
    '&:before': {
      position: 'absolute',
      zIndex: '-1',
      width: '200vw',
      left: '-100vw',
      height: '100%',
      backgroundColor: '#E8E8E8'
    }
  }
});

const Navbar = ({ logoutUser, logoutAdmin, userData }) => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      {userData && !userData.admin ? (
        <>
          <MyLink destination={`/`}>Home</MyLink>
          <MyLink destination={`/requests/new`}>Make A New Request!</MyLink>
        </>
      ) : null}
      {userData && userData.admin ? (
        <>
          <MyLink destination='/admin/'>Requests</MyLink>
          <MyLink destination='/admin/itinerary_packages'>Packages</MyLink>
        </>
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
