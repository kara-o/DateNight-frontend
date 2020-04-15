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
    marginBottom: '10px'
  },
  details: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute'
  }
});

const SimpleCard = ({ pkgItem, handleDelete }) => {
  const classes = useStyles();
  return (
    <div key={pkgItem.id} className={classes.container}>
      <div className={classes.details}>
        <p>{pkgItem.place}</p>
        <p>{pkgItem.duration} minutes</p>
        <Button onClick={() => handleDelete(pkgItem.id)}>
          Remove
      </Button>
      </div>
    </div>
  );
};

export default SimpleCard;
