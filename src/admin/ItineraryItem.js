import React, { useState } from 'react';
import Map from '../layout/Map';
import { Paper } from '@material-ui/core';
import * as moment from 'moment';

const ItineraryItem = props => {
  const { item, admin } = props;
  return (
    <>
      {admin || item.arrival_time < new Date() ? (
        <Paper elevation={10} className='paper itin-item-display'>
          <div className='details'>
            <h3>Details</h3>
            <div className='details-p'>
              <p>{moment(item.arrival_time).format('h:mm a')}</p>
              <p>{item.place}</p>
              <p>{item.address}</p>
              <p>{item.blurb}</p>
              <p>
                <a href={item.map_url}>Google Map</a>
              </p>
            </div>
          </div>
          <Map url={item.map_iframe_url} />
        </Paper>
      ) : null}
    </>
  );
};

export default ItineraryItem;
