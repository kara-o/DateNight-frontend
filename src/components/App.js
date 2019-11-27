import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Main from './Main';
import Login from './Login';
import Navbar from './Navbar';
import Footer from './Footer';
import Signup from './Signup';
import Request from './Request';
import RequestShow from './RequestShow';

const App = () => {
  const loggedIn = !!localStorage.getItem('userData');
  const [currentUserData, setCurrentUserData] = useState({});
  // const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      setCurrentUserData(userData);
      // setRequests(userData.user.requests);
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

  // const pushNewRequest = request => {
  //   setRequests([...currentUserData.user.requests, request]);
  // };

  const renderItinerary = () => {
    console.log('need to render itinerary!');
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
                  <Request
                    {...props}
                    currentUserData={currentUserData}
                    // pushNewRequest={pushNewRequest}
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
                  <Sidebar currentUserData={currentUserData} />
                  <RequestShow {...props} currentUserData={currentUserData} />
                </>
              ) : null
            }
          />
          <Route path='/'>
            {loggedIn ? (
              <>
                <Sidebar currentUserData={currentUserData} />
                <Main
                  currentUserData={currentUserData}
                  renderItinerary={renderItinerary}
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
