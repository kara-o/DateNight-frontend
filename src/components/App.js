import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import Signup from './Signup';

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
    <div>
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
        <Route path='/signup' render={props => <Signup {...props} />} />
        <Route path='/'>
          {loggedIn ? (
            <div>
              <Navbar logoutUser={logoutUser} />
              <Home currentUser={currentUser} />
            </div>
          ) : (
            <Redirect to='/login' />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
