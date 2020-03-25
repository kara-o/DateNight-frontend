import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import Button from './Button';

const QuestionModal = ({
  buttonText,
  questionText,
  acceptText,
  declineText = null,
  navigateAwayAction,
  onClick = null
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = e => {
    if (onClick) {
      onClick(e);
      setOpen(true);
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {questionText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {declineText ? (
            <Button onClick={handleClose} color='primary'>
              {declineText}
            </Button>
          ) : null}
          <Button onClick={navigateAwayAction} color='primary' autoFocus>
            {acceptText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuestionModal;
