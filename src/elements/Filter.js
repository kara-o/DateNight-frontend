import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  filter: {
    textAlign: 'center',
    display: 'block'
  }
});

const Filter = ({ title, value, onChange, children, styles }) => {
  const classes = useStyles();
  return (
    <div className={classes.filter + ' ' + styles}>
      <label>
        {title}
        <select value={value} onChange={onChange}>
          {children}
        </select>
      </label>
    </div>
  );
};

export default Filter;
