import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import UserHome from './user/components/UserHome';
import Login from './user/components/Login';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import SignUp from './user/components/SignUp';
import Request from './user/components/Request';
import RequestShow from './user/components/RequestShow';
import { logoutUser } from './user/services/api';
import { logoutAdmin } from './admin/services/api-admin';
import AdminLogin from './admin/components/AdminLogin';
import AdminHome from './admin/components/AdminHome';
import AdminRequestShow from './admin/components/AdminRequestShow';
import AdminItineraryPackages from './admin/components/AdminItineraryPackages';
import AdminItineraryPackage from './admin/components/AdminItineraryPackage';
import AdminItineraryPackageShow from './admin/components/AdminItineraryPackageShow';
import AdminItineraryItems from './admin/components/AdminItineraryItems';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
    'navbar navbar'
    'main main'
    'footer footer'`,
    justifyItems: 'center'
  }
});

const getUserData = () => {
  const userDataStr = localStorage.getItem('userData');
  if (!userDataStr) return null;
  return JSON.parse(userDataStr);
};

const App = () => {
  const [userData, setUserData] = useState(getUserData());
  const loggedIn = !!userData;

  const classes = useStyles();

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
    <div className={classes.mainContainer}>
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
                <div>
                  <Request edit={true} {...props} userData={userData} />
                </div>
              ) : null
            }
          />
          <Route
            path='/requests/new'
            render={props =>
              loggedIn && !userData.admin ? (
                <div>
                  <Request {...props} userData={userData} />
                </div>
              ) : null
            }
          />
          <Route
            path='/requests/:id'
            render={props =>
              loggedIn && !userData.admin ? (
                <div>
                  <RequestShow {...props} userData={userData} />
                </div>
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
              <div>
                <AdminItineraryPackage {...props} userData={userData} />
              </div>
            )}
          />
          <Route
            path='/admin/itinerary_packages/:id/edit'
            render={props => (
              <div>
                <AdminItineraryPackage
                  {...props}
                  edit={true}
                  userData={userData}
                />
              </div>
            )}
          />
          <Route
            path='/admin/itinerary_packages/:id'
            render={props => (
              <div>
                <AdminItineraryPackageShow {...props} userData={userData} />
              </div>
            )}
          />
          <Route
            path='/admin/itinerary_packages'
            render={props => (
              <div>
                <AdminItineraryPackages {...props} userData={userData} />
              </div>
            )}
          />
          <Route
            path='/admin/itinerary_items'
            render={props => (
              <div>
                <AdminItineraryItems {...props} userData={userData} />
              </div>
            )}
          />
          <Route
            path='/admin/requests/:id'
            render={props => (
              <div>
                <AdminRequestShow {...props} userData={userData} />
              </div>
            )}
          />
          <Route
            path='/admin'
            render={props =>
              loggedIn && userData.admin ? (
                <div>
                  <AdminHome {...props} userData={userData} />
                </div>
              ) : (
                <Redirect to='/admin/login' />
              )
            }
          />
          <Route path='/'>
            {loggedIn && !userData.admin ? (
              <div>
                <UserHome userData={userData} />
              </div>
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
        </Switch>
      </>
      <Footer />
    </div>
  );
};

export default App;
