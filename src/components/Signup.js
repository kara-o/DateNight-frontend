import React, { useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

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
    let inputFields = Object.keys(errors.errorObj);
    inputFields.forEach(field => {
      //TODO - focus on input
      document.getElementsByName(field)[0].style.borderColor = 'red';
    });
    return errors.fullMessages.map((error, idx) => <li key={idx}>{error}</li>);
  };

  return (
    <div>
      <ul>{errors ? renderErrors(errors) : null}</ul>
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
        <label>
          Email:
          <input
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          First Name:
          <input
            type='text'
            name='first_name'
            value={formData.first_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type='text'
            name='last_name'
            value={formData.last_name}
            onChange={handleChange}
          />
        </label>
        <input type='submit' value='Signup' />
      </form>
      <Link to='/login'>Back</Link>
    </div>
  );
};

export default Signup;
