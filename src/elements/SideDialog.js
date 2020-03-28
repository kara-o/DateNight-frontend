import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '600px'
  }
});

const SideDialog = ({ children, styles }) => {
  const classes = useStyles();
  return <div className={classes.container + ' ' + styles}>{children}</div>;
};

export default SideDialog;
