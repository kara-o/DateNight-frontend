import React, { useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import Button from './layout/Button';

const Login = props => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);

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
        setError(res.error);
      }
    });
    setFormData({
      username: '',
      password: ''
    });
  };

  return (
    <div className='container'>
      <form className='form container'>
        <ul className='errors'>{error ? <li>{error}</li> : null}</ul>
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
        <Button type='submit' onClick={handleSubmit}>
          Login
        </Button>
      </form>
      <Link to='/signup'>New user? Sign up for an account</Link>
    </div>
  );
};

export default Login;
