import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  filter: {
    display: 'block',
    paddingTop: '20px',
    paddingBottom: '20px'
  }
});

const Filter = ({ title, value, onChange, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.filter}>
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
