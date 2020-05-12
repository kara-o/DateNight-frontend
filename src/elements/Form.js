import React from "react";
import { createUseStyles } from "react-jss";
import { MyPaper } from ".";

const useStyles = createUseStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  formContainer: {
    "@media all and (max-width: 599px)": {
      width: "400px",
    },
    "@media all and (min-width: 600px)": {
      width: "500px",
    },
  },
});

const Form = ({ children, styles }) => {
  const classes = useStyles();
  return (
    <MyPaper styles={classes.formContainer + " " + styles}>
      <form className={classes.form}>{children}</form>
    </MyPaper>
  );
};

export default Form;
