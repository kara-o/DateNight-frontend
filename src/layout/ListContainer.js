import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    gridArea: 'main'
  },
  list: {
    listStyle: 'none'
  }
});

const ListContainer = ({ title, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2>{title}</h2>
      <ul className={classes.list}>{children}</ul>
    </div>
  );
};

export default ListContainer;
