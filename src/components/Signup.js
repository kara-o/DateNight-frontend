import React, { useState } from 'react';

const Signup = ({ signupUser }) => {
  console.log('here in signup!');
  return (
    <div>
      <form onSubmit={signupUser}>Signup Form</form>
    </div>
  );
};

export default Signup;
