import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    padding: '50px',
    textAlign: 'center'
  }
});

const SideDialog = ({ children, styles }) => {
  const classes = useStyles();
  return <div className={classes.container + ' ' + styles}>{children}</div>;
};

export default SideDialog;
