import React, { useState, useEffect } from 'react';
import Button from './layout/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchOptions, createRequest } from '../services/api';
import '../../slider.css';
//userData.user userData.token

const Request = props => {
  const { userData } = props;
  const [formData, setFormData] = useState({
    start_time: '',
    end_time: '',
    party_size: '2',
    notes: '',
    contacts_attributes: [{ phone: '2066602445' }]
  });
  const [neighborhoodSelection, setNeighborhoodSelection] = useState(null);
  const [priceRangeSelection, setPriceRangeSelection] = useState(null);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState(null);

  //TODO add loading
  useEffect(() => {
    if (userData) {
      fetchOptions('neighborhoods', userData).then(list => {
        list.sort((a, b) => a.name.localeCompare(b.name));
        setNeighborhoods(list);
        setNeighborhoodSelection(list[0].id);
      });
      fetchOptions('price_ranges', userData).then(list => {
        setPriceRanges(list);
        setPriceRangeSelection(list[0].id);
      });
    }
  }, [userData]);

  const handleChange = (value, name) => {
    console.log(value);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createRequest(
      {
        ...formData,
        neighborhood_id: neighborhoodSelection,
        price_range_id: priceRangeSelection
      },
      userData
    ).then(json => {
      if (!json.errors) {
        props.history.push('/');
      } else {
        setErrors({
          errorObj: json.errors.error_obj,
          fullMessages: json.errors.full_messages
        });
      }
    });
  };

  const renderErrors = errors => {
    return errors.fullMessages.map((error, idx) => <li key={idx}>{error}</li>);
  };

  const renderOptions = (array, attribute) => {
    return array.map(o => {
      return (
        <option key={o.id} value={o.id}>
          {o[`${attribute}`]}
        </option>
      );
    });
  };

  return (
    <div id='request-form-page'>
      <form id='new-request-form' autoComplete='off'>
        <ul className='errors'>{errors ? renderErrors(errors) : null}</ul>
        Start Time
        <DatePicker
          id='start-time'
          selected={formData.start_time}
          onChange={value => handleChange(value, 'start_time')}
          showTimeSelect
          timeFormat='hh:mm aa'
          timeIntervals={30}
          timeCaption='time'
          dateFormat='MMMM d, yyyy h:mm aa'
          placeholderText='Select date and start time'
        />
        End Time
        <DatePicker
          id='end-time'
          selected={formData.end_time}
          onChange={value => handleChange(value, 'end_time')}
          showTimeSelect
          timeFormat='hh:mm aa'
          timeIntervals={30}
          timeCaption='time'
          dateFormat='MMMM d, yyyy h:mm aa'
          placeholderText='Select date and end time'
        />
        <div id='party-size'>
          Party Size
          <select
            value={formData.party_size}
            onChange={e => {
              handleChange(e.target.value, 'party_size');
            }}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>
        </div>
        Neighborhood
        <select
          name='neighborhood_id'
          value={neighborhoodSelection}
          onChange={e => {
            setNeighborhoodSelection(e.target.value);
          }}
        >
          {renderOptions(neighborhoods, 'name')}
        </select>
        Price (please select approximate limit)
        <select
          name='price_range_id'
          value={priceRangeSelection}
          onChange={e => {
            setPriceRangeSelection(e.target.value);
          }}
        >
          {renderOptions(priceRanges, 'max_amount')}
        </select>
        <textarea
          id='notes'
          name='notes'
          placeholder='Add any notes for us pertaining to your request!'
          onChange={value => handleChange(value, 'notes')}
        ></textarea>
        <Button type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Request;
