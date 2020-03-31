import React from 'react';
import { Map, Button, Itin } from '.';
import * as moment from 'moment';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  title: {
    margin: '0px',
    textAlign: 'center'
  },
  container: {
    maxWidth: '600px',
    border: '1px solid lightgrey',
    padding: '20px',
    marginBottom: '20px'
  }
});

const ItineraryItem = props => {
  const { item, admin, handleRemove, index } = props;
  const classes = useStyles();

  const getNumberWithOrdinal = n => {
    //https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number/13627586
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>{getNumberWithOrdinal(index + 1)} Stop</h3>
      <div>
        <p>{moment(item.arrival_time).format('h:mm a')}</p>
        <p>{item.place}</p>
        <p>{item.address}</p>
        <p>{item.blurb}</p>
        {admin && item.make_res_link ? (
          <p>
            <a href={item.make_res_link} target='_blank'>
              Restaurant Link
            </a>
          </p>
        ) : null}
        <p>
          <a href={item.map_url} target='_blank'>
            Google Map
          </a>
        </p>
      </div>

      <Map url={item.map_iframe_url} />
      {admin ? (
        <Button onClick={() => handleRemove(item)}>
          Remove from Itinerary
        </Button>
      ) : null}
    </div>
  );
};

export default ItineraryItem;
