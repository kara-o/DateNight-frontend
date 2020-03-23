import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    gridArea: 'main',
    textAlign: 'center'
  }
});

const LoginSignUpContainer = ({ children }) => {
  const classes = useStyles();
  return <form className={classes.container}>{children}</form>;
};

export default LoginSignUpContainer;
