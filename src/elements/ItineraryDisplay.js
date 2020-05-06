import React from "react";
import { ListContainer } from ".";
import ItineraryItem from "./ItineraryItem";

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
        <li key={item.id}>
          <ItineraryItem
            item={item}
            index={sortedItems.indexOf(item)}
            admin={admin}
            handleRemove={handleRemove}
          />
        </li>
      );
    });
  } else {
    return null;
  }
};

const ItineraryDisplay = ({
  items,
  children,
  admin = false,
  handleRemove = null,
}) => {
  return (
    <ListContainer title="Itinerary">
      {children}
      {renderItinerary(items, admin, handleRemove)}
    </ListContainer>
  );
};

export default ItineraryDisplay;
