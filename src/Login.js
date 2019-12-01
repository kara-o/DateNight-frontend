import React, { useState } from 'react';
import { login } from './user/services/api';
import { Link, useLocation } from 'react-router-dom';
import Button from './user/components/layout/Button';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
        debugger;
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
          userData = { ...userData, user: json.data };
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
    <>
      <div className='container'>
        {isAccountConfirmationPending ? <h3>Confirmation email sent</h3> : null}
        {isAccountConfirmed ? (
          <h3>Thank you for confirming your account</h3>
        ) : null}
        <form className='container'>
          <ul className='errors'>{error ? <li>{error}</li> : null}</ul>
          <input
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
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
    </>
  );
};

export default Login;
