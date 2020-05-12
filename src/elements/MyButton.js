import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    background: "#7F7F7F",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 48,
    padding: "0 30px",
    margin: "20px 0px 0px 0px",
    "&:hover": {
      background: "#2D232E",
    },
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
  },
  label: {
    textTransform: "uppercase",
    color: "white",
  },
});

const MyButton = ({ type = "button", onClick, children, styles = null }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={() => onClick()}
      classes={{
        root: classes.root + " " + styles,
        label: classes.label,
      }}
      type={type}
    >
      {children}
    </Button>
  );
};

export default MyButton;
