import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import Signup from './Signup';
import Request from './Request';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
  const loggedIn = !!localStorage.getItem('dataObj');
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (loggedIn) {
      const user = JSON.parse(localStorage.getItem('dataObj')).user;
      setCurrentUser(user);
    }
  }, [loggedIn]);

  const loginUser = data => {
    localStorage.setItem('dataObj', JSON.stringify(data));
    setCurrentUser(data.user);
  };

  const logoutUser = () => {
    localStorage.removeItem('dataObj');
    setCurrentUser({});
  };

  return (
    <>
      <CssBaseline />
      {loggedIn ? <Navbar logoutUser={logoutUser} /> : null}
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
          path='/request'
          render={props =>
            loggedIn ? <Request {...props} currentUser={currentUser} /> : null
          }
        />
        <Route path='/'>
          {loggedIn ? (
            <div>
              <Home currentUser={currentUser} />
            </div>
          ) : (
            <Redirect to='/login' />
          )}
        </Route>
      </Switch>
    </>
  );
};

export default App;
