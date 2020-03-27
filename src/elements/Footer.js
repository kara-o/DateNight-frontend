import React from 'react';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  footerContainer: {
    gridArea: 'footer',
    display: 'grid',
    // gridTemplateColumns:
    //   '[col1-start] 1fr [col1-end col2-start] 1fr [col2-end col3-start] 1fr [col3-end]',
    // gridTemplateRows: 'auto',
    justifyItems: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E8E8E8'
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
