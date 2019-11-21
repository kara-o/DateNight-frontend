import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from
import Login from

const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  const loggedIn = !!currentUser.id;

  return (
    <div>
      <Router>
        <Route exact path='/'>
          {loggedIn ? <Home /> : <Redirect to='/login' />}
        </Route>
        <Route path='/login' render={props => <Login {...props} />} />
      </Router>
    </div>
  );

  // const [users, setUsers] = useState('');

  // useEffect(() => {
  //   api.users.getUsers().then(users => {
  //     setUsers(users);
  //   });
  // }, [users]);

  // const renderUsers = users => {
  //   return users.map(user => {
  //     return <div key={user.id}>{user.first_name}</div>;
  //   });
  // };

  // return <div>{users ? renderUsers(users) : null}</div>;
};

export default App;
