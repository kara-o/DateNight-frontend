import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserHome from './UserHome';
import Login from './Login';
import Navbar from '../../layout/Navbar';
import Footer from './Footer';
import Signup from './Signup';
import Request from './Request';
import RequestShow from './RequestShow';
import { logoutUser } from '../services/api';
import { logoutAdmin } from '../../admin/api-admin';
import AdminLogin from '../../admin/AdminLogin';
import AdminHome from '../../admin/AdminHome';
import AdminRequestShow from '../../admin/AdminRequestShow';
import ItineraryItem from '../../admin/ItineraryItem';
import AdminItineraryPackages from '../../admin/AdminItineraryPackages';
import AdminItineraryPackage from '../../admin/AdminItineraryPackage';
import AdminItineraryPackageShow from '../../admin/AdminItineraryPackageShow';

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

  const handleLogoutUser = () => {
    logoutUser(userData);
    localStorage.removeItem('userData');
    setUserData(null);
  };

  const handleLogoutAdmin = () => {
    logoutAdmin(userData);
    localStorage.removeItem('userData');
    setUserData(null);
  };

  return (
    <>
      {loggedIn ? (
        <>
          <Navbar
            logoutAdmin={handleLogoutAdmin}
            logoutUser={handleLogoutUser}
            userData={userData}
          />
          <Sidebar userData={userData} />
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
            path='/requests/:id/edit'
            render={props =>
              loggedIn && !userData.admin ? (
                <div className='user-page'>
                  <Request edit={true} {...props} userData={userData} />
                </div>
              ) : null
            }
          />
          <Route
            path='/requests/new'
            render={props =>
              loggedIn && !userData.admin ? (
                <div className='user-page'>
                  <Request {...props} userData={userData} />
                </div>
              ) : null
            }
          />
          <Route
            path='/requests/:id'
            render={props =>
              loggedIn && !userData.admin ? (
                <div className='user-page'>
                  <RequestShow {...props} userData={userData} />
                </div>
              ) : null
            }
          />
          <Route
            path='/admin/login'
            render={props => <AdminLogin {...props} handleLogin={loginUser} />}
          />
          <Route
            path='/admin/itinerary_packages/new'
            render={props => (
              <div className='admin-page'>
                <AdminItineraryPackage {...props} userData={userData} />
              </div>
            )}
          />
          <Route
            path='/admin/itinerary_packages/:id'
            render={props => (
              <div className='admin-page'>
                <AdminItineraryPackageShow {...props} userData={userData} />
              </div>
            )}
          />
          <Route
            path='/admin/itinerary_packages'
            render={props => (
              <div className='admin-page'>
                <AdminItineraryPackages {...props} userData={userData} />
              </div>
            )}
          />
          <Route
            path='/admin/requests/:id'
            render={props => (
              <div className='admin-page'>
                <AdminRequestShow {...props} userData={userData} />
              </div>
            )}
          />
          <Route
            path='/admin'
            render={props =>
              loggedIn && userData.admin ? (
                <div className='admin-page'>
                  <AdminHome {...props} userData={userData} />
                </div>
              ) : (
                <Redirect to='/admin/login' />
              )
            }
          />
          <Route path='/'>
            {loggedIn && !userData.admin ? (
              <div className='user-page'>
                <UserHome userData={userData} />
              </div>
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
