import React from "react";
import { Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  filter: {
    textAlign: "center",
  },
  select: {
    fontSize: "16px",
  },
});

const Filter = ({ title, value, onChange, children, styles }) => {
  const classes = makeStyles();
  return (
    <div className={classes.filter + " " + styles}>
      <label>
        {title}
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          {children}
        </Select>
      </label>
    </div>
  );
};

export default Filter;
