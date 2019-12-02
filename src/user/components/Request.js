import React, { useState, useEffect } from 'react';
import Button from './layout/Button';
import DatePicker from 'react-datepicker';
import TextField from '@material-ui/core/TextField';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchOptions, createRequest } from '../services/api';
import * as moment from 'moment';

function thisFriday() {
  const dayINeed = 5; // Friday
  const today = moment().isoWeekday();

  if (today <= dayINeed) {
    return moment().isoWeekday(dayINeed);
  } else {
    return moment().add(1, 'week');
  }
}

const Request = props => {
  const { userData } = props;
  const [formData, setFormData] = useState({
    start_date: thisFriday(),
    start_time: '07:30T',
    party_size: '2',
    notes: ''
  });
  const [neighborhoodSelection, setNeighborhoodSelection] = useState(null);
  const [priceRangeSelection, setPriceRangeSelection] = useState(null);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [contacts, setContacts] = useState([userData.user.phone]);
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
        price_range_id: priceRangeSelection,
        contacts_attributes: contacts.map(contact => ({
          phone: contact
        }))
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

  const updateContactAt = (contact, i) => {
    const contactsCopy = contacts.slice();
    if (contact.length) {
      if (contacts.length === i) {
        contactsCopy.push(contact);
      } else {
        contactsCopy[i] = contact;
      }
    } else if (i < contacts.length) {
      contactsCopy.splice(i, 1);
    }
    setContacts(contactsCopy);
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
        <TextField
          label='Date'
          type='date'
          value={formData.start_time}
          onChange={e => {
            debugger;
            handleChange(e.target.value, 'start_date');
          }}
          className='datepicker'
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label='Time'
          type='time'
          value={formData.start_time}
          onChange={e => {
            debugger;
            handleChange(e.target.value, 'start_time');
          }}
          className='datepicker'
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 1800 // 30 min
          }}
        />
        <br />
        <br />
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
          onChange={e => handleChange(e.target.value, 'notes')}
          value={formData.notes}
        ></textarea>
        <div id='contacts-div'>
          {contacts
            .concat([''])
            .slice(0, 4) // limit to 4
            .map((contact, i) => (
              <TextField
                key={i}
                className='outlined-basic'
                label={`Contact Phone #${i + 1}`}
                variant='outlined'
                value={contact}
                type='tel'
                onChange={e => updateContactAt(e.target.value, i)}
              />
            ))}
        </div>
        <Button type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Request;
