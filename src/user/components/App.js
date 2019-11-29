import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserHome from './UserHome';
import Login from '../../Login';
import Navbar from './Navbar';
import Footer from './Footer';
import Signup from './Signup';
import Request from './Request';
import RequestShow from './RequestShow';
import AdminHome from '../../admin/AdminHome';

const App = () => {
  const loggedIn = !!localStorage.getItem('userData');
  const admin = !!localStorage.getItem('admin');
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
    if (data.user.admin) {
      localStorage.setItem('admin', 'true');
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('userData');
    setCurrentUserData({});
    localStorage.removeItem('admin');
  };

  return (
    <>
      {loggedIn ? (
        <>
          <Navbar logoutUser={logoutUser} currentUser={currentUserData.user} />
          <Sidebar currentUser={currentUserData.user} />
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
            path='/request'
            render={props =>
              loggedIn ? (
                <>
                  <Request
                    {...props}
                    token={currentUserData.jwt}
                    currentUser={currentUserData.user}
                  />
                </>
              ) : null
            }
          />
          <Route
            path='/requests/:id'
            render={props =>
              loggedIn ? (
                <>
                  <RequestShow
                    {...props}
                    currentUser={currentUserData.user}
                    token={currentUserData.jwt}
                  />
                </>
              ) : null
            }
          />
          <Route
            path='/admin-login'
            render={props => (
              <Login {...props} admin={true} handleLogin={loginUser} />
            )}
          />
          <Route
            path='/admin-home'
            render={props =>
              loggedIn && admin ? (
                <>
                  <AdminHome {...props} token={currentUserData.jwt} />
                </>
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route path='/'>
            {loggedIn ? (
              <>
                <UserHome
                  currentUser={currentUserData.user}
                  token={currentUserData.jwt}
                />
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
