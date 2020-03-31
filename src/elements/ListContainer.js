import React from 'react';
import { ScrollContainer } from '.';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const ListContainer = ({ title = null, children, styles }) => {
  const classes = useStyles();

  return (
    <div className={styles + ' ' + classes.container}>
      {title ? <h2>{title}</h2> : null}
      <ScrollContainer className={classes.list}>{children}</ScrollContainer>
    </div>
  );
};

export default ListContainer;
