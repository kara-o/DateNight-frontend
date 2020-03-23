import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  list: {
    listStyle: 'none'
  }
});

const ListContainer = ({ title, children, styles }) => {
  console.log(styles);
  const classes = useStyles();

  return (
    <div className={styles}>
      <h2>{title}</h2>
      <ul className={classes.list}>{children}</ul>
    </div>
  );
};

export default ListContainer;
