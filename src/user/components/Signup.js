import React, { useState } from 'react';
import { createUser } from '../services/api';
import { Link } from 'react-router-dom';
import Button from '../../layout/Button';
import TextField from '@material-ui/core/TextField';

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
    <div className='signup-container'>
      <h1 className='login'>Welcome</h1>
      <form className='signup-form'>
        <ul className='errors'>{errors ? renderErrors(errors) : null}</ul>
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
        <TextField
          type='password'
          name='password_confirmation'
          value={formData.password_confirmation}
          onChange={handleChange}
          label='Confirm Password'
        />
        <TextField
          type='text'
          name='first_name'
          value={formData.first_name}
          onChange={handleChange}
          label='First Name'
        />
        <TextField
          type='text'
          name='last_name'
          value={formData.last_name}
          onChange={handleChange}
          label='Last Name'
        />
        <TextField
          type='text'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          label='Phone Number'
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
