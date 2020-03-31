import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  input: {
    padding: '10px',
    margin: '10px',
    minWidth: '200px'
  }
});

const MyInput = ({ type, name, value, onChange, placeholder }) => {
  const classes = useStyles();
  return (
    <input
      className={classes.input}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default MyInput;
