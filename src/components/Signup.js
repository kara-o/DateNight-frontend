import React, { useState } from 'react';
import { api } from '../services/api';

const Signup = props => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState(false);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.users.createUser(formData).then(res => {
      if (!res.error) {
        props.history.push('/login');
      } else {
        setError(true);
      }
    });
  };

  return (
    <div>
      {error ? (
        <h2>One or more of your entries are invalid. Please try again.</h2>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          First Name:
          <input
            type='text'
            name='first_name'
            value={formData.first_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type='text'
            name='last_name'
            value={formData.last_name}
            onChange={handleChange}
          />
        </label>
        <input type='submit' value='Signup' />
      </form>
    </div>
  );
};

export default Signup;
