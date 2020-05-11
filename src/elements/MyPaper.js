import React from "react";
import { Paper } from "@material-ui/core";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    padding: "20px",
    backgroundColor: "#F7FFF6",
  },
});

const MyPaper = ({ children, styles }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container + " " + styles} elevation={5}>
      {children}
    </Paper>
  );
};

export default MyPaper;
