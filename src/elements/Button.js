import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    width: '50px',
    padding: '5px'
  }
});

const Button = ({ type = 'button', onClick, styles, children }) => {
  const classes = useStyles();
  console.log('in button element with onClick of: ', onClick);
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
