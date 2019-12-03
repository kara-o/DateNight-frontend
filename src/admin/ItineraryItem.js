import React, { useState } from 'react';
import Button from '../layout/Button';
import { Paper } from '@material-ui/core';

const ItineraryItem = props => {
  const { item } = props;
  return (
    <Paper className='itin-item-display'>
      <p>Time: </p>
      <p>{item.place}</p>
      <p>{item.address}</p>
      <p>{item.blurb}</p>
      {item.map}
    </Paper>
  );
};

export default ItineraryItem;
