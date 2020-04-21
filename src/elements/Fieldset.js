import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    width: 'calc(100% - 1em);',
    padding: '10px',
    marginBottom: '10px',
  },
});

const Fieldset = ({ legend, children, styles }) => {
  const classes = useStyles();
  return (
    <fieldset className={classes.container + ' ' + styles}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
