import React from "react";
import { createUseStyles } from "react-jss";
import { MyLink } from ".";

const useStyles = createUseStyles({
  container: {
    gridColumn: "1/3",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  link: {
    margin: "20px",
  },
});

const LoginSignUpContainer = ({ title, link = null, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1 className="title-fantasy-font">{title}</h1>
      {children}
      {link ? (
        <MyLink styles={classes.link} destination={link.destination}>
          {link.text}
        </MyLink>
      ) : null}
    </div>
  );
};

export default LoginSignUpContainer;
