import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "#533747",
      fontWeight: "bold",
    },
  },
});

const MyLink = ({ children, destination, onClick, addressCancel, styles }) => {
  const classes = useStyles();
  return (
    <Link
      className={classes.link + " " + styles}
      to={{ pathname: destination, state: { addressCancel } }}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default MyLink;
