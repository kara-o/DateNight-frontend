import React, { useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

const Login = props => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    api.auth.login(formData).then(res => {
      if (!res.error) {
        props.handleLogin(res);
        props.history.push('/');
      } else {
        setError(true);
      }
    });
    setFormData({
      username: '',
      password: ''
    });
  };

  return (
    <div>
      {error ? (
        <h2>
          Username and/or password is incorrect. Please try again or signup for
          a new account.
        </h2>
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
        <input type='submit' value='Login' />
        <Link to='/signup'>New user? Sign up for an account</Link>
      </form>
    </div>
  );
};

export default Login;
