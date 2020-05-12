import React from "react";
import { ExtendedBackground, MyLink } from ".";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    gridArea: "footer",
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#533747",
  },
  flex: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: "48px",
    marginBottom: "0px",
  },
  copyright: {
    fontSize: "12px",
  },
  link: {
    "&:hover": {
      fontWeight: "bold",
      color: "black",
    },
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.container}>
      <ExtendedBackground />

      <h1 className={classes.title + " " + "title-fantasy-font"}>DateNight</h1>
      <div>
        <MyLink styles={classes.link}>About</MyLink> •{" "}
        <MyLink styles={classes.link}>Contact</MyLink>
      </div>

      <p className={classes.copyright}>Established ♥ 2020</p>
    </footer>
  );
};

export default Footer;
