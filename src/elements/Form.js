import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    padding: "10px",
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
  return <form className={classes.form + " " + styles}>{children}</form>;
};

export default Form;
