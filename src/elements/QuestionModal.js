import React, { useState, useEffect } from 'react';
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
    padding: '30px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const QuestionModal = ({
  buttonText = null,
  children,
  acceptText,
  declineText = null,
  closeAction = null,
  navigateAwayAction,
  onClick = null,
  startOpen = false
}) => {
  const [open, setOpen] = useState(startOpen);
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
      {buttonText ? <Button onClick={handleClickOpen}>{buttonText}</Button> : null}
      {open ? (
        <div className={classes.container}>
          <div className={classes.modal}>
            {children}
            <div>
              {declineText ? (
                <Button onClick={closeAction ? () => {
                  handleClose()
                  closeAction()
                } : handleClose} color='primary'>
                  {declineText}
                </Button>
              ) : null}
              <Button onClick={() => {
                navigateAwayAction()
                handleClose()
              }} color='primary'>
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
