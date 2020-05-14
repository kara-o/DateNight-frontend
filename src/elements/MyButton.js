import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    background: "#F0F7F4",
    borderRadius: 3,
    border: 0,
    height: 48,
    padding: "0 30px",
    margin: "20px 0px 0px 0px",
    color: "black",
    "&:hover": {
      background: "#5D737E",
      color: "white",
      cursor: "pointer",
    },
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
  },
  label: {
    textTransform: "uppercase",
    // "&:hover": {
    //   color: "white",
    // },
  },
});

const MyButton = ({ type = "button", onClick, children }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={() => onClick()}
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      type={type}
    >
      {children}
    </Button>
  );
};

export default MyButton;
