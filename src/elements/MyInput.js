import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "10px",
    width: "75%",
  },
});

const MyInput = ({ type, name, value, onChange, placeholder }) => {
  const classes = useStyles();
  return (
    <TextField
      classes={{
        root: classes.root,
      }}
      id="outlined-basic"
      label={placeholder}
      variant="outlined"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default MyInput;
