import React, { useState, useEffect } from 'react';
import Button from './layout/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { api } from '../services/api';

const Request = ({ currentUserData }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    start_time: '',
    end_time: '',
    size: ''
  });
  const [errors, setErrors] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [prices, setPrices] = useState([]);

  //TODO add loading
  useEffect(() => {
    if (currentUserData.jwt) {
      api.fetchOptions('cuisines', currentUserData.jwt).then(res => {
        setCuisines(res);
      });
      api.fetchOptions('neighborhoods', currentUserData.jwt).then(res => {
        setNeighborhoods(res);
      });
      api
        .fetchOptions('prices', currentUserData.jwt)
        .then(res => setPrices(res));
    }
  }, [currentUserData]);

  const renderPrices = () => {
    return prices.map(p => {
      return (
        <div>
          <input type='radio' id={p} name='price' value={p} />
          <label htmlFor={p}>$</label>
        </div>
      );
    });
  };

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userId = currentUserData.user.id;
    const token = currentUserData.jwt;
    api.createRequest(formData, userId, token);
  };

  return (
    <div className='request'>
      <form autoComplete='off'>
        <label htmlFor='date'> Date </label>
        <DatePicker
          id='date'
          selected={formData.date}
          onChange={value => handleChange(value, 'date')}
        />
        <label htmlFor='start-time'> Start Time </label>
        <DatePicker
          id='start-time'
          selected={formData.start_time}
          onChange={value => handleChange(value, 'start_time')}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption='Time'
          dateFormat='h:mm aa'
        />
        <label htmlFor='end-time'> End Time </label>
        <DatePicker
          id='end-time'
          selected={formData.end_time}
          onChange={value => handleChange(value, 'end_time')}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption='Time'
          dateFormat='h:mm aa'
        />
        <label htmlFor='party-size'> Party Size </label>
        <select
          id='party-size'
          name='size'
          onChange={e => handleChange(e.target.value, 'party-size')}
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
        </select>
        <Button type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Request;
