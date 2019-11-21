import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});

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
