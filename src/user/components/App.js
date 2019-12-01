import React, { Component, useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserHome from './UserHome';
import Login from '../../Login';
import Navbar from './Navbar';
import Footer from './Footer';
import Signup from './Signup';
import Request from './Request';
import RequestShow from './RequestShow';
import { logout } from '../services/api';

function getUserData() {
  const userDataStr = localStorage.getItem('userData');
  if (!userDataStr) return null;
  return JSON.parse(userDataStr);
}

const App = () => {
  const [userData, setUserData] = useState(getUserData());
  const loggedIn = !!userData;

  const loginUser = userData => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setUserData(userData);
  };

  const logoutUser = () => {
    logout(userData);
    localStorage.removeItem('userData');
    setUserData(null);
  };

  return (
    <>
      {loggedIn ? (
        <>
          <Navbar logoutUser={logoutUser} currentUser={userData} />
          <Sidebar currentUser={userData} />
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
              !loggedIn ? <Signup {...props} /> : <Redirect to='/' />
            }
          />
          <Route
            path='/requests/new'
            render={props =>
              loggedIn ? (
                <>
                  <Request {...props} userData={userData} />
                </>
              ) : null
            }
          />
          <Route
            path='/requests/:id'
            render={props =>
              loggedIn ? (
                <>
                  <RequestShow {...props} userData={userData} />
                </>
              ) : null
            }
          />
          <Route path='/'>
            {loggedIn ? (
              <>
                <UserHome userData={userData} />
              </>
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

export default App;
