import React, { useState } from 'react';
import { login } from '../services/api';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../layout/Button';
import TextField from '@material-ui/core/TextField';
import LoginSignUpContainer from '../../layout/LoginSignUpContainer';
import Form from '../../layout/Form';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const query = useQuery();
  const isAccountConfirmationPending = !!query.get(
    'account_confirmation_pending'
  );
  const isAccountConfirmed = !!query.get('account_confirmation_success');

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
          userData = { ...userData, user: json.data, admin: false };
          props.handleLogin(userData);
          props.history.push('/');
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
      <h1>DateNight</h1>
      <>
        {isAccountConfirmationPending ? (
          <h3>Confirmation email sent - check your inbox!</h3>
        ) : null}
        {isAccountConfirmed ? (
          <h3>Thank you for confirming your account! Please login.</h3>
        ) : null}
        <Form>
          <ul>{error ? <li>{error}</li> : null}</ul>
          <TextField
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
            label='Email'
            variant='filled'
          />
          <TextField
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            label='Password'
            variant='filled'
          />
          <Button type='submit' onClick={handleSubmit}>
            Login
          </Button>
        </Form>
        <Link to='/signup'>New user? Sign up for an account</Link>
      </>
    </LoginSignUpContainer>
  );
};

export default Login;
