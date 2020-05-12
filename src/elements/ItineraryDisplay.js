import React from "react";
import ItineraryItem from "./ItineraryItem";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const sortItinItemsByDate = (items) => {
  return items.sort((item1, item2) => {
    const time1 = new Date(item1.arrival_time);
    const time2 = new Date(item2.arrival_time);
    if (time1 > time2) {
      return 1;
    }
    if (time1 < time2) {
      return -1;
    }
    return 0;
  });
};

const renderItinerary = (items, admin, handleRemove) => {
  if (items.length) {
    const sortedItems = sortItinItemsByDate(items);
    return sortedItems.map((item) => {
      return (
        <ItineraryItem
          item={item}
          index={sortedItems.indexOf(item)}
          admin={admin}
          handleRemove={handleRemove}
        />
      );
    });
  } else {
    return null;
  }
};

const ItineraryDisplay = ({
  items,
  admin = false,
  handleRemove = null,
  children,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1 className={classes.title + " " + "title-fantasy-font"}>Itinerary</h1>
      {children}
      {renderItinerary(items, admin, handleRemove)}
    </div>
  );
};

export default ItineraryDisplay;
