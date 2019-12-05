import React, { useState } from 'react';
import Map from '../layout/Map';
import { Paper } from '@material-ui/core';
import * as moment from 'moment';

const ItineraryItem = props => {
  const { item, admin } = props;
  return (
    <>
      <Paper elevation={10} className='paper itin-item-display'>
        <div className='details'>
          <h3>Details</h3>
          <div className='details-p'>
            <p>{moment(item.arrival_time).format('h:mm a')}</p>
            <p>{item.place}</p>
            <p>{item.address}</p>
            <p>{item.blurb}</p>
            {admin && item.make_res_link ? (
              <p>
                <a href={item.make_res_link} target='_blank'>
                  Make Reservation
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
      </Paper>
    </>
  );
};

export default ItineraryItem;
