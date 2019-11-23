import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Signup from './Signup';
import Request from './Request';

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
      {loggedIn ? <Navbar logoutUser={logoutUser} /> : null}
      <div className='content'>
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
              <Home currentUser={currentUser} />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
