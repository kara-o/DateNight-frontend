import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "10px",
    width: "250px",
  },
  tel: {
    margin: "10px",
    width: "150px",
  },
});

const MyInput = ({ type, name, value, onChange, placeholder }) => {
  const classes = useStyles();

  if (type === "tel") {
    return (
      <TextField
        classes={{
          root: classes.tel,
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
  }

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
