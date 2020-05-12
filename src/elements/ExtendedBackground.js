import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  background: {
    position: "absolute",
    zIndex: "-1",
    width: "200vw",
    left: "-100vw",
    height: "200px",
    backgroundColor: "#533747",
  },
});

const ExtendedBackground = () => {
  const classes = useStyles();

  return <div className={classes.background} />;
};

export default ExtendedBackground;
