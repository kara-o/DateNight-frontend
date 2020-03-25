import React from 'react';
import TextField from '@material-ui/core/TextField';

const MyInput = ({ type, name, value, onChange, label }) => {
  return (
    <TextField
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      variant='filled'
    />
  );
};

export default MyInput;
