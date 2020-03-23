import React, { useState } from 'react';
import { login } from '../services/api-admin';
import Button from '../../layout/Button';
import TextField from '@material-ui/core/TextField';
import Form from '../../layout/Form';
import LoginSignUpContainer from '../../layout/LoginSignUpContainer';

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
    let userData;
    login(formData)
      .then(res => {
        if (res.status < 400) {
          const accessToken = res.headers.get('access-token');
          const client = res.headers.get('client');
          const uid = res.headers.get('uid');
          const expiry = res.headers.get('expiry');
          userData = { accessToken, client, expiry, uid };
        }
        return res.json();
      })
      .then(json => {
        if (!json.errors) {
          userData = { ...userData, user: json.data, admin: true };
          props.handleLogin(userData);
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
    <LoginSignUpContainer>
      <h2>DateNight Admin Login</h2>
      <Form>
        <ul>{error ? <li>{error}</li> : null}</ul>
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
      </Form>
    </LoginSignUpContainer>
  );
};

export default AdminLogin;
