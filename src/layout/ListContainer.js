import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  list: {
    listStyle: 'none',
    margin: '0',
    padding: '0'
  },
  container: {
    textAlign: 'center',
    width: '100%'
  }
});

const ListContainer = ({ title, children, styles }) => {
  const classes = useStyles();

  return (
    <div className={styles + ' ' + classes.container}>
      <h2>{title}</h2>
      <ul className={classes.list}>{children}</ul>
    </div>
  );
};

export default ListContainer;
