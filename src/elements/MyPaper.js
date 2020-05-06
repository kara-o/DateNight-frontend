import React from "react";
import { Paper } from "@material-ui/core";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    padding: "20px",
  },
});

const MyPaper = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container} elevation={5}>
      {children}
    </Paper>
  );
};

export default MyPaper;
