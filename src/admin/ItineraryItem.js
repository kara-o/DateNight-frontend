import React, { useState } from 'react';
import Map from '../layout/Map';
import { Paper } from '@material-ui/core';
import * as moment from 'moment';

const ItineraryItem = props => {
  const { item } = props;
  return (
    <Paper elevation={10} className='paper itin-item-display'>
      <h3>Details</h3>
      <p>{moment(item.arrival_time).format('h:mm a')}</p>
      <p>{item.place}</p>
      <p>{item.address}</p>
      <p>{item.blurb}</p>
      <p>
        <a href={item.map_url}>Google map</a>
      </p>
      <Map url={item.map_iframe_url} />
    </Paper>
  );
};

export default ItineraryItem;
