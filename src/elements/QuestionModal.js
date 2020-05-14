import React, { useState, useEffect } from "react";
import { MyButton } from ".";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: "1",
  },
  modal: {
    position: "fixed",
    background: "white",
    width: "50%",
    height: "auto",
    maxHeight: "75%",
    overflow: "scroll",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "2",
  },
  button: {
    margin: "20px",
  },
  buttonDiv: {
    margin: "30px 0px 0px 0px",
    width: "100%",
  },
});

const QuestionModal = ({
  buttonText = null,
  children,
  acceptText,
  declineText = null,
  closeAction = null,
  navigateAwayAction,
  onClick = null,
  startOpen = false,
}) => {
  const [open, setOpen] = useState(startOpen);
  const classes = useStyles();

  const handleClickOpen = (e) => {
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
      {buttonText ? (
        <MyButton styles={classes.button} onClick={handleClickOpen}>
          {buttonText}
        </MyButton>
      ) : null}
      {open ? (
        <div className={classes.container}>
          <div className={classes.modal}>
            {children}
            <div className={classes.buttonDiv}>
              {declineText ? (
                <MyButton
                  onClick={
                    closeAction
                      ? () => {
                          handleClose();
                          closeAction();
                        }
                      : handleClose
                  }
                  color="primary"
                >
                  {declineText}
                </MyButton>
              ) : null}
              <MyButton
                onClick={() => {
                  navigateAwayAction();
                  handleClose();
                }}
                color="primary"
                styles={classes.button}
              >
                {acceptText}
              </MyButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionModal;
