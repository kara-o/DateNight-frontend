import React, { useState } from 'react';
import { createUser } from '../services/api';
import {
  Button,
  MyLink,
  Form,
  LoginSignUpContainer,
  MyInput
} from '../../elements';

const SignUp = props => {
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
    <LoginSignUpContainer>
      <h1>Welcome</h1>
      <Form>
        <ul>{errors ? renderErrors(errors) : null}</ul>
        <MyInput
          type='text'
          name='email'
          value={formData.email}
          onChange={handleChange}
          label='Email'
        />
        <MyInput
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          label='Password'
        />
        <MyInput
          type='password'
          name='password_confirmation'
          value={formData.password_confirmation}
          onChange={handleChange}
          label='Confirm Password'
        />
        <MyInput
          type='text'
          name='first_name'
          value={formData.first_name}
          onChange={handleChange}
          label='First Name'
        />
        <MyInput
          type='text'
          name='last_name'
          value={formData.last_name}
          onChange={handleChange}
          label='Last Name'
        />
        <MyInput
          type='text'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          label='Phone Number'
        />
        <Button type='submit' onClick={handleSubmit}>
          Signup
        </Button>
        <MyLink destination='/login'>Back</MyLink>
      </Form>
    </LoginSignUpContainer>
  );
};

export default SignUp;
