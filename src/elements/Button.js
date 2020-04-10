import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    maxWidth: '150px',
    padding: '10px',
    margin: '5px'
  }
});

const Button = ({ type = 'button', onClick, styles, children }) => {
  const classes = useStyles();
  return (
    <button
      onClick={() => onClick()}
      className={classes.button + ' ' + styles}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
