import React from 'react';
import ScrollContainer from '.';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  list: {
    listStyle: 'none',
    margin: '0',
    padding: '0'
  },
  container: {
    textAlign: 'center',
    width: '100%'
  }
});

const sortItinItemsByDate = items => {
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

const renderItinerary = items => {
  const sortedItems = sortItinItemsByDate(items);
  return sortedItems.map(item => {
    return (
      <ItineraryItem
        key={item.id}
        item={item}
        index={sortedItems.indexOf(item)}
      />
    );
  });
};

const ItineraryDisplay = () => {
  return <ScrollContainer></ScrollContainer>;
};
