import React from 'react';
import Button from '@material-ui/core/Button';

const MyButton = ({ type, onClick, className = '', children }) => {
  return (
    <Button
      onClick={onClick}
      className={`${className} button`}
      type={type}
      variant='contained'
      color='primary'
    >
      {children}
    </Button>
  );
};

export default MyButton;
