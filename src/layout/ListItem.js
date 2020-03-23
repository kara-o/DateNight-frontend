import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  listItem: {
    display: 'flex',
    flexDirection: 'row'
  }
});

const ListItem = ({ children }) => {
  const classes = useStyles();

  return <li className={classes.list}>{children}</li>;
};

export default ListItem;
