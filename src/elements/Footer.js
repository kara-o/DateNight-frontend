import React from 'react';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    gridArea: 'footer',
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E8E8E8',
    position: 'relative',
    '&:before': {
      position: 'absolute',
      zIndex: '-1',
      width: '200vw',
      left: '-100vw',
      height: '100%',
      backgroundColor: '#E8E8E8'
    }
  },
  text: {
    margin: '0px'
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.container}>
      <p className={classes.text}>DateNight ♥ 2020</p>
    </footer>
  );
};

export default Footer;
