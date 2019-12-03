import React, { useState } from 'react';
import Button from '../layout/Button';
import { TextField } from '@material-ui/core';

const ItineraryItem = props => {
  const [formData, setFormData] = useState({
    place: '',
    time: '',
    address: '',
    blurb: '',
    res_link: '',
    make_res_link: true //TODO make boolean in backend
  });

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <form className='itinerary-item-form' autoComplete='off'>
      <TextField label='Date' />
      <TextField label='Time' />
      <TextField label='Place' />
      <TextField label='Address' />
      <TextField label='Phone' />
      <TextField label='Reservation Link' />
      <TextField
        multiline
        rows={3}
        label='Blurb'
        className='textarea blurb'
        value={formData.blurb}
        onChange={e => handleChange(e.target.value, 'blurb')}
      />
      <p>Google Map</p>
      <Button type='submit' onClick={handleSubmit}>
        Save
      </Button>
    </form>
  );
};

export default ItineraryItem;
