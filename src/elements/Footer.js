import React from 'react';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  footerContainer: {
    gridArea: 'footer'
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footerContainer}>
      <p>DateNight ♥ 2020</p>
    </footer>
  );
};

export default Footer;
