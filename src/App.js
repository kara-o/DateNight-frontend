import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import UserHome from './user/components/UserHome';
import Login from './user/components/Login';
import Navbar from './layout/Navbar';
import Footer from './user/components/Footer';
import Signup from './user/components/Signup';
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

import { connect } from 'react-redux';
import { setAuth, setUser, setAdmin } from './actions';

const mapStateToProps = state => ({
  user: state.user,
  admin: state.admin,
  auth: state.auth
});

const App = ({ user, auth, admin, dispatch }) => {
  const loggedIn = !!user.id;

  const handleLogoutUser = () => {
    logoutUser(auth);
    localStorage.removeItem('credentials');
    dispatch(setAuth({}));
    dispatch(setUser({}));
  };

  const handleLogoutAdmin = () => {
    logoutAdmin(auth);
    localStorage.removeItem('credentials');
    dispatch(setAuth({}));
    dispatch(setUser({}));
  };

  const handleLogin = (user, auth, admin) => {
    console.log(admin);
    dispatch(setAuth(auth));
    dispatch(setUser(user));
    dispatch(setAdmin(admin));
    localStorage.setItem('credentials', JSON.stringify({ user, auth, admin }));
  };

  return (
    <>
      {loggedIn ? (
        <>
          <Navbar
            logoutAdmin={handleLogoutAdmin}
            logoutUser={handleLogoutUser}
          />
          <Sidebar />
        </>
      ) : null}
      <>
        <Switch>
          <Route
            path='/login'
            render={props =>
              !loggedIn ? (
                <Login {...props} handleLogin={handleLogin} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/signup'
            render={props =>
              !loggedIn ? <Signup {...props} /> : <Redirect to='/' />
            }
          />
          <Route
            path='/requests/:id/edit'
            render={props =>
              loggedIn && !admin ? (
                <div className='user-page'>
                  <Request edit={true} {...props} />
                </div>
              ) : null
            }
          />
          <Route
            path='/requests/new'
            render={props =>
              loggedIn && !admin ? (
                <div className='user-page'>
                  <Request {...props} />
                </div>
              ) : null
            }
          />
          <Route
            path='/requests/:id'
            render={props =>
              loggedIn && !admin ? (
                <div className='user-page'>
                  <RequestShow {...props} />
                </div>
              ) : null
            }
          />
          <Route
            path='/admin/login'
            render={props => (
              <AdminLogin {...props} handleLogin={handleLogin} />
            )}
          />
          <Route
            path='/admin/itinerary_packages/new'
            render={props => (
              <div className='admin-page'>
                <AdminItineraryPackage {...props} />
              </div>
            )}
          />
          <Route
            path='/admin/itinerary_packages/:id/edit'
            render={props => (
              <div className='admin-page'>
                <AdminItineraryPackage {...props} edit={true} />
              </div>
            )}
          />
          <Route
            path='/admin/itinerary_packages/:id'
            render={props => (
              <div className='admin-page'>
                <AdminItineraryPackageShow {...props} />
              </div>
            )}
          />
          <Route
            path='/admin/itinerary_packages'
            render={props => (
              <div className='admin-page'>
                <AdminItineraryPackages {...props} />
              </div>
            )}
          />
          <Route
            path='/admin/itinerary_items'
            render={props => (
              <div className='admin-page'>
                <AdminItineraryItems {...props} />
              </div>
            )}
          />
          <Route
            path='/admin/requests/:id'
            render={props => (
              <div className='admin-page'>
                <AdminRequestShow {...props} />
              </div>
            )}
          />
          <Route
            path='/admin'
            render={props =>
              loggedIn && admin ? (
                <div className='admin-page'>
                  <AdminHome {...props} />
                </div>
              ) : (
                <Redirect to='/admin/login' />
              )
            }
          />
          <Route path='/'>
            {loggedIn && !admin ? (
              <div className='user-page'>
                <UserHome />
              </div>
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
        </Switch>
      </>
      <Footer />
    </>
  );
};

export default connect(mapStateToProps)(App);
