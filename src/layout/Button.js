import React from 'react';
import MaterialButton from '@material-ui/core/Button';

const Button = ({ type, onClick, className = '', children }) => {
  return (
    <MaterialButton
      onClick={onClick}
      className={`${className} button`}
      type={type}
      variant='contained'
      color='primary'
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
