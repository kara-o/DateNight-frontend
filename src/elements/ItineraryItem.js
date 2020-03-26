import React from 'react';
import { Map, Button } from '.';
import { Paper } from '@material-ui/core';
import * as moment from 'moment';

const ItineraryItem = props => {
  const { item, admin, handleRemove } = props;

  console.log(item);

  return (
    <>
      <Paper elevation={10}>
        <div>
          <h3>Details</h3>
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
        </div>
        <Map url={item.map_iframe_url} />
        {admin ? (
          <Button onClick={() => handleRemove(item)}>
            Remove from Itinerary
          </Button>
        ) : null}
      </Paper>
    </>
  );
};

export default ItineraryItem;
