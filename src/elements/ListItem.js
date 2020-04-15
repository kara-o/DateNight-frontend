import React from 'react';
import MyLink from './MyLink';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  listItem: {
    display: 'grid',
    gridTemplateColumns:
      '[col1-start] 1fr [col1-end col2-start] 1fr [col2-end col3-start] 1fr [col3-end]',
    gridTemplateRows: 'auto',
    justifyItems: 'center',
    textAlign: 'center'
  },
  outerLi: {
    width: '100%'
  }
});

const ListItem = ({ children, destination, id }) => {
  const classes = useStyles();

  return (
    <li className={classes.outerLi} key={id}>
      <MyLink destination={destination}>
        <span className={classes.listItem}>{children}</span>
      </MyLink>
    </li>
  );
};

export default ListItem;
