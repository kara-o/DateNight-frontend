import React from 'react';
import { ExtendedBackground } from '.';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    gridArea: 'footer',
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E8E8E8'
  },
  text: {
    margin: '0px'
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.container}>
      <ExtendedBackground />
      <p className={classes.text}>DateNight ♥ 2020</p>
    </footer>
  );
};

export default Footer;
