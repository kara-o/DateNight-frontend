import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Main from './Main';
import Login from '../../Login';
import Navbar from './Navbar';
import Footer from './Footer';
import Signup from './Signup';
import Request from './Request';
import RequestShow from './RequestShow';
import AdminHome from '../../admin/AdminHome';

const App = () => {
  const loggedIn = !!localStorage.getItem('userData');
  const [currentUserData, setCurrentUserData] = useState({});
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      setCurrentUserData(userData);
      if (userData.user.admin) {
        setAdmin(true);
      }
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
                  <Sidebar currentUser={currentUserData.user} />
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
                  <Sidebar currentUser={currentUserData.user} />
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
              admin ? (
                <>
                  <Sidebar admin={admin} currentUser={currentUserData.user} />
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
                <Sidebar currentUser={currentUserData.user} />
                <Main
                  admin={admin}
                  currentUser={currentUserData.user}
                  token={currentUserData.jwt}
                />
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
