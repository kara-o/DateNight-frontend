import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'scroll'
  }
});

const ScrollContainer = ({ children, styles }) => {
  const classes = useStyles();
  return <div className={classes.container + ' ' + styles}>{children}</div>;
};

export default ScrollContainer;
