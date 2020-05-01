import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "turquoise",
    },
  },
});

const MyLink = ({ children, destination, onClick, addressCancel }) => {
  const classes = useStyles();
  return (
    <Link
      className={classes.link}
      to={{ pathname: destination, state: { addressCancel } }}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default MyLink;
