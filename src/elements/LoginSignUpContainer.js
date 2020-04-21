import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    gridColumn: '1/3',
    textAlign: 'center',
  },
});

const LoginSignUpContainer = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
};

export default LoginSignUpContainer;
