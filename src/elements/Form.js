import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    margin: '10px',
    padding: '10px'
  }
});

const Form = ({ children, styles }) => {
  const classes = useStyles();
  return <form className={classes.form + ' ' + styles}>{children}</form>;
};

export default Form;
