import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const loggedIn = !!currentUser.id;

  const loginUser = data => {
    localStorage.setItem('token', data.jwt);
    setCurrentUser(data.user);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setCurrentUser({});
  };

  return (
    <div>
      <Router>
        <Navbar handleLogout={logoutUser} currentUser={currentUser} />
        <Route exact path='/'>
          {loggedIn ? <Home /> : <Redirect to='/login' />}
        </Route>
        <Route
          path='/login'
          render={props => <Login {...props} handleLogin={loginUser} />}
        />
      </Router>
    </div>
  );
};

export default App;
