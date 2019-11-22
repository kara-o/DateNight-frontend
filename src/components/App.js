import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const token = localStorage.getItem('token');
  const loggedIn = !!token;

  const loginUser = data => {
    localStorage.setItem('token', data.jwt);
    setCurrentUser(data.user);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setCurrentUser({});
  };

  useEffect(() => {
    if (token) {
      console.log('token found!');
      api.auth.getCurrentUser().then(data => {
        setCurrentUser(data.user);
      });
    }
  }, []);

  return (
    <div>
      <Router>
        <Route path='/'>
          {loggedIn ? (
            <div>
              <Home />
              <Navbar handleLogout={logoutUser} currentUser={currentUser} />
            </div>
          ) : (
            <Redirect to='/login' />
          )}
        </Route>
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
      </Router>
    </div>
  );
};

export default App;
