import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    listStyle: 'none',
    margin: '0',
    padding: '0'
  }
});

const ScrollContainer = ({ children, styles }) => {
  const classes = useStyles();
  return <ul className={classes.container + ' ' + styles}>{children}</ul>;
};

export default ScrollContainer;
