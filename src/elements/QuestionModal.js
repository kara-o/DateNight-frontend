import React, { useState } from 'react';
import Button from './Button';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({});

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
        <div className={classes.modalContainer}>
          <p>{questionText}</p>

          <div>
            {declineText ? (
              <Button onClick={handleClose} color='primary'>
                {declineText}
              </Button>
            ) : null}
            <Button onClick={navigateAwayAction} color='primary' autoFocus>
              {acceptText}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionModal;
