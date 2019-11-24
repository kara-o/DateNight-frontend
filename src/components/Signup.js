import React, { useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import Button from './layout/Button';

const Signup = props => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: ''
  });
  const [errors, setErrors] = useState(null);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.users.createUser(formData).then(res => {
      if (!res.errors) {
        props.history.push('/login');
      } else {
        setErrors({
          errorObj: res.errors.error_obj,
          fullMessages: res.errors.full_messages
        });
      }
    });
  };

  const renderErrors = errors => {
    return errors.fullMessages.map((error, idx) => <li key={idx}>{error}</li>);
  };

  return (
    <div className='container'>
      <form className='container'>
        <ul className='errors'>{errors ? renderErrors(errors) : null}</ul>
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
        <input
          type='text'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
        />
        <input
          type='text'
          name='first_name'
          value={formData.first_name}
          onChange={handleChange}
          placeholder='First Name'
        />
        <input
          type='text'
          name='last_name'
          value={formData.last_name}
          onChange={handleChange}
          placeholder='Last Name'
        />
        <Button type='submit' onClick={handleSubmit}>
          Signup
        </Button>
      </form>
      <Link to='/login'>Back</Link>
    </div>
  );
};

export default Signup;
