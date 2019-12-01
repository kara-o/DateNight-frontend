import React, { useState } from 'react';
import { createUser } from '../services/api';
import { Link } from 'react-router-dom';
import Button from './layout/Button';

const Signup = props => {
  const [formData, setFormData] = useState({
    password: '',
    password_confirmation: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: ''
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
    createUser(formData).then(json => {
      if (!json.errors) {
        props.history.push('/login?account_confirmation_pending=true');
      } else {
        setErrors({
          fullMessages: json.errors.full_messages
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
        <input
          type='password'
          name='password_confirmation'
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder='Confirm Password'
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
        <input
          type='text'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          placeholder='Phone Number'
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
