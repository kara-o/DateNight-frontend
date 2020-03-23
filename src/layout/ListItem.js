import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  listItem: {
    display: 'grid',
    gridTemplateColumns:
      '[col1-start] 1fr [col1-end col2-start] 1fr [col2-end col3-start] 1fr [col3-end]',
    gridTemplateRows: 'auto',
    justifyItems: 'center'
  }
});

const ListItem = ({ children }) => {
  const classes = useStyles();

  return <li className={classes.listItem}>{children}</li>;
};

export default ListItem;
