import React from "react";
import MyLink from "./MyLink";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  listItem: {
    display: "grid",
    gridTemplateRows: "auto",
    justifyItems: "center",
    textAlign: "center",
  },
  fourColumns: {
    gridTemplateColumns:
      "[col1-start] 1fr [col1-end col2-start] 1fr [col2-end col3-start] 1fr [col3-end col4-start] 1fr [col4-end]",
  },
  twoColumns: {
    gridTemplateColumns:
      "[col1-start] 1fr [col1-end col2-start] 1fr [col2-end]",
  },
  threeColumns: {
    gridTemplateColumns:
      "[col1-start] 1fr [col1-end col2-start] 1fr [col2-end col3-start] 1fr [col3-end]",
  },
  outerLi: {
    width: "100%",
  },
});

const ListItem = ({ children, destination, id, styles }) => {
  const classes = useStyles();
  return (
    <li className={classes.outerLi} key={id}>
      <MyLink destination={destination}>
        <span className={classes.listItem + " " + classes[`${styles}`]}>
          {children}
        </span>
      </MyLink>
    </li>
  );
};

export default ListItem;
