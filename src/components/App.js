import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import Signup from './Signup';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem('token');
  const loggedIn = !!currentUser;

  useEffect(() => {
    if (token) {
      console.log('token found!');
      api.auth.getCurrentUser().then(data => {
        setCurrentUser(data.user);
      });
    }
  }, [token]);

  const loginUser = data => {
    localStorage.setItem('token', data.jwt);
    setCurrentUser(data.user);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
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
              <Navbar logoutUser={logoutUser} currentUser={currentUser} />
              <Home />
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
