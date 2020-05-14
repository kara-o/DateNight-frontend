import React from "react";
import { Map, MyButton, MyPaper } from ".";
import * as moment from "moment";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    padding: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "@media all and (max-width: 599px)": {
      width: "400px",
      height: "700px",
    },
    "@media all and (min-width: 600px) and (max-width: 1099px)": {
      width: "550px",
      height: "750px",
    },
    "@media all and (min-width: 1100px)": {
      width: "650px",
      height: "850px",
    },
    position: "relative",
  },
  title: {
    margin: "0px",
    textAlign: "center",
  },
  button: {
    margin: "5px",
    top: "0px",
    right: "0px",
    position: "absolute",
    padding: "5px",
  },
  details: {
    width: "100%",
  },
});

const ItineraryItem = (props) => {
  const { item, admin, handleRemove, index } = props;
  const classes = useStyles();

  const getNumberWithOrdinal = (n) => {
    //https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number/13627586
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <MyPaper styles={classes.container}>
      {admin ? (
        <button
          className={classes.button}
          type="button"
          onClick={() => handleRemove(item)}
        >
          X
        </button>
      ) : null}
      <h3 className={classes.title}>{getNumberWithOrdinal(index + 1)} Stop</h3>
      <div className={classes.details}>
        <p>{moment(item.arrival_time).format("h:mm a")}</p>
        <p>{item.place}</p>
        <p>{item.address}</p>
        <p>{item.blurb}</p>
        {admin && item.make_res_link ? (
          <p>
            <a href={item.make_res_link} target="_blank">
              Restaurant Link
            </a>
          </p>
        ) : null}
        <p>
          <a href={item.map_url} target="_blank">
            Google Map
          </a>
        </p>
      </div>

      <Map url={item.map_iframe_url} />
    </MyPaper>
  );
};

export default ItineraryItem;
