import React, { useState } from 'react';
import { api } from './user/services/api';
import { Link } from 'react-router-dom';
import Button from './user/components/layout/Button';

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
    api.login(formData).then(res => {
      if (!res.error) {
        props.handleLogin(res);
        if (props.admin) {
          props.history.push('/admin-home');
        } else {
          props.history.push('/');
        }
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
    <>
      <div className='container'>
        <h2>{props.admin ? 'ADMIN LOGIN' : null}</h2>
        <form className='container'>
          <ul className='errors'>{error ? <li>{error}</li> : null}</ul>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            placeholder='Username'
          />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
          />
          <Button type='submit' onClick={handleSubmit}>
            Login
          </Button>
        </form>
        {!props.admin ? (
          <Link to='/signup'>New user? Sign up for an account</Link>
        ) : null}
      </div>
      <Link
        id='corner-link'
        to={props.admin ? '/login' : '/admin-login'}
        onClick={() => setError(null)}
      >
        {!props.admin ? 'Admin' : 'Login'}
      </Link>
    </>
  );
};

export default Login;
