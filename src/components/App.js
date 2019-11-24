import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Main from './Main';
import Login from './Login';
import Navbar from './Navbar';
import Footer from './Footer';
import Signup from './Signup';
import Request from './Request';

const App = () => {
  const loggedIn = !!localStorage.getItem('userData');
  const [currentUserData, setCurrentUserData] = useState({});

  useEffect(() => {
    if (loggedIn) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      setCurrentUserData(userData);
    }
  }, [loggedIn]);

  const loginUser = data => {
    localStorage.setItem('userData', JSON.stringify(data));
    setCurrentUserData(data);
  };

  const logoutUser = () => {
    localStorage.removeItem('userData');
    setCurrentUserData({});
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
              loggedIn ? (
                <>
                  <Sidebar currentUserData={currentUserData} />
                  <Request {...props} currentUserData={currentUserData} />
                </>
              ) : null
            }
          />
          <Route path='/'>
            {loggedIn ? (
              <>
                <Sidebar currentUserData={currentUserData} />
                <Main currentUserData={currentUserData} />
              </>
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
