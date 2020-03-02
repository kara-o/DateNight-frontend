import React, { useState } from 'react';
import { login } from '../services/api-admin';
import Button from '../../layout/Button';
import TextField from '@material-ui/core/TextField';

const AdminLogin = props => {
  const [formData, setFormData] = useState({
    email: '',
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
    let auth;
    let user;
    login(formData)
      .then(res => {
        if (res.status < 400) {
          const accessToken = res.headers.get('access-token');
          const client = res.headers.get('client');
          const uid = res.headers.get('uid');
          const expiry = res.headers.get('expiry');
          auth = { accessToken, client, expiry, uid };
        }
        return res.json();
      })
      .then(json => {
        if (!json.errors) {
          user = json.data;
          props.handleLogin(user, auth);
          props.history.push('/admin');
        } else {
          setError(json.errors);
        }
      });
    setFormData({
      email: '',
      password: ''
    });
  };

  return (
    <div className='admin-login'>
      <h2 className='icon'>DateNight Admin Login</h2>
      <form className='admin-login'>
        <ul className='errors'>{error ? <li>{error}</li> : null}</ul>
        <TextField
          type='text'
          name='email'
          value={formData.email}
          onChange={handleChange}
          label='Email'
        />
        <TextField
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          label='Password'
        />
        <Button type='submit' onClick={handleSubmit}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
