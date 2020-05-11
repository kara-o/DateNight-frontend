import React from "react";
import { createUseStyles } from "react-jss";
import { MyPaper } from ".";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflow: "auto",
    listStyle: "none",
    margin: "0",
    padding: "0",
  },
  paper: {
    width: "100%",
  },
});

const ScrollContainer = ({ children, styles }) => {
  const classes = useStyles();
  return (
    <MyPaper styles={classes.paper}>
      <ul className={classes.container + " " + styles}>{children}</ul>
    </MyPaper>
  );
};

export default ScrollContainer;
