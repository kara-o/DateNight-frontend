import React from 'react';
import Button from './Button';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    width: '200px',
    height: '200px',
    position: 'relative',
    border: '1px solid black',
    padding: '10px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '10px'
  },
  button: {
    position: 'absolute',
    bottom: '20px'
  },
  duration: {
    position: 'absolute',
    bottom: '40px'
  },
  place: {
    position: 'absolute',
    top: '10px'
  }
});

const SimpleCard = ({ pkgItem, handleDelete }) => {
  const classes = useStyles();
  return (
    <div key={pkgItem.id} className={classes.container}>
      <p className={classes.place}>{pkgItem.place}</p>
      <p className={classes.duration}>{pkgItem.duration} minutes</p>

      <Button styles={classes.button} onClick={() => handleDelete(pkgItem.id)}>
        Remove
      </Button>
    </div>
  );
};

export default SimpleCard;
