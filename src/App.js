import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import {
  Login,
  SignUp,
  Request,
  RequestShow,
  UserHome
} from './user/components';
import {
  AdminHome,
  AdminItineraryPackage,
  AdminItineraryPackageShow,
  AdminItineraryPackages,
  AdminItineraryItems,
  AdminLogin,
  AdminRequestShow
} from './admin/components';
import { Navbar, Footer } from './elements';
import { logoutUser } from './user/services/api';
import { logoutAdmin } from './admin/services/api-admin';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@global': {
    '#root': {
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: '50% 50%',
      gridTemplateRows: '50px auto auto 50px',
      gridTemplateAreas: `
      'navbar navbar'
      'main main'
      'main main'
      'footer footer'`,
      justifyItems: 'center'
    }
  }
});

const getUserData = () => {
  const userDataStr = localStorage.getItem('userData');
  if (!userDataStr) return null;
  return JSON.parse(userDataStr);
};

const App = () => {
  useStyles();
  const [userData, setUserData] = useState(getUserData());
  const loggedIn = !!userData;

  const loginUser = userData => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setUserData(userData);
  };

  const handleLogoutUser = () => {
    logoutUser(userData);
    localStorage.removeItem('userData');
    setUserData(null);
  };

  const handleLogoutAdmin = () => {
    logoutAdmin(userData);
    localStorage.removeItem('userData');
    setUserData(null);
  };

  return (
    <>
      {loggedIn ? (
        <>
          <Navbar
            logoutAdmin={handleLogoutAdmin}
            logoutUser={handleLogoutUser}
            userData={userData}
          />
        </>
      ) : null}
      <>
        <Switch>
          <Route
            path='/login'
            render={props =>
              !loggedIn ? (
                <Login {...props} handleLogin={loginUser} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/signup'
            render={props =>
              !loggedIn ? <SignUp {...props} /> : <Redirect to='/' />
            }
          />
          <Route
            path='/requests/:id/edit'
            render={props =>
              loggedIn && !userData.admin ? (
                <>
                  <Request edit={true} {...props} userData={userData} />
                </>
              ) : null
            }
          />
          <Route
            path='/requests/new'
            render={props =>
              loggedIn && !userData.admin ? (
                <>
                  <Request {...props} userData={userData} />
                </>
              ) : null
            }
          />
          <Route
            path='/requests/:id'
            render={props =>
              loggedIn && !userData.admin ? (
                <>
                  <RequestShow {...props} userData={userData} />
                </>
              ) : null
            }
          />
          <Route
            path='/admin/login'
            render={props => <AdminLogin {...props} handleLogin={loginUser} />}
          />
          <Route
            path='/admin/itinerary_packages/new'
            render={props => (
              <>
                <AdminItineraryPackage {...props} userData={userData} />
              </>
            )}
          />
          <Route
            path='/admin/itinerary_packages/:id/edit'
            render={props => (
              <>
                <AdminItineraryPackage
                  {...props}
                  edit={true}
                  userData={userData}
                />
              </>
            )}
          />
          <Route
            path='/admin/itinerary_packages/:id'
            render={props => (
              <>
                <AdminItineraryPackageShow {...props} userData={userData} />
              </>
            )}
          />
          <Route
            path='/admin/itinerary_packages'
            render={props => (
              <>
                <AdminItineraryPackages {...props} userData={userData} />
              </>
            )}
          />
          <Route
            path='/admin/itinerary_items'
            render={props => (
              <>
                <AdminItineraryItems {...props} userData={userData} />
              </>
            )}
          />
          <Route
            path='/admin/requests/:id'
            render={props => (
              <>
                <AdminRequestShow {...props} userData={userData} />
              </>
            )}
          />
          <Route
            path='/admin'
            render={props =>
              loggedIn && userData.admin ? (
                <>
                  <AdminHome {...props} userData={userData} />
                </>
              ) : (
                <Redirect to='/admin/login' />
              )
            }
          />
          <Route
            path='/'
            render={props =>
              loggedIn && !userData.admin ? (
                <>
                  <UserHome {...props} userData={userData} />
                </>
              ) : (
                <Redirect to='/login' />
              )
            }
          />
        </Switch>
      </>
      <Footer />
    </>
  );
};

export default App;
