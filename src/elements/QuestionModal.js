import React, { useState } from 'react';
import Button from './Button';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)'
  },
  modal: {
    position: 'fixed',
    background: 'white',
    width: 'auto',
    maxWidth: '50%',
    height: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    textAlign: 'center'
  }
});

const QuestionModal = ({
  buttonText,
  questionText,
  acceptText,
  declineText = null,
  navigateAwayAction,
  onClick = null
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = e => {
    if (onClick) {
      onClick(e).then(setOpen(true));
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>{buttonText}</Button>
      {open ? (
        <div className={classes.container}>
          <div className={classes.modal}>
            <p>{questionText}</p>
            <div>
              {declineText ? (
                <Button onClick={handleClose} color='primary'>
                  {declineText}
                </Button>
              ) : null}
              <Button onClick={navigateAwayAction} color='primary'>
                {acceptText}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionModal;
