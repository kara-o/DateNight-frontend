import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '80vh',
    overflow: 'scroll'
  }
});

const ScrollContainer = ({ children, styles }) => {
  const classes = useStyles();
  return <div className={classes.container + ' ' + styles}>{children}</div>;
};

export default ScrollContainer;
