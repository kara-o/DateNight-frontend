import React, { useState } from 'react';
import Button from './layout/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cuisines from '../data/cuisines';
import neighborhoods from '../data/neighborhoods';
import { api } from '../services/api';

const Request = ({ currentUserData }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    start_time: '',
    end_time: '',
    cuisine: '',
    neighborhood: '',
    price: '0,30'
  });
  const [errors, setErrors] = useState(null);

  const handleMultipleChange = e => {
    const name = e.target.name;
    const { options } = e.target;
    const value = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const renderOptions = optionsArray => {
    return optionsArray.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userId = currentUserData.user.id;
    const token = currentUserData.jwt;
    api.createRequest(formData, userId, token);
  };

  return (
    <div className='request'>
      <form>
        <label for='date'> Date </label>
        <DatePicker
          id='date'
          selected={formData.date}
          onChange={value => handleChange(value, 'date')}
        />
        <label for='start-time'> Start Time </label>
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
        <label for='end-time'> End Time </label>
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
        <label for='cuisine'> Cuisine(s) </label>
        <select
          id='cuisine'
          name='cuisine'
          onChange={handleMultipleChange}
          multiple
        >
          {renderOptions(cuisines)}
        </select>
        <label for='neighborhood'> Neighborhood(s) </label>
        <select
          id='neighborhood'
          name='neighborhood'
          onChange={handleMultipleChange}
          multiple
        >
          {renderOptions(neighborhoods)}
        </select>
        <label for='price'> Price Range </label>
        <select
          id='price'
          name='price'
          onChange={e => handleChange(e.target.value, 'price')}
        >
          <option value={[0, 30]}>$$ ( $30 and under )</option>
          <option value={[31, 50]}>$$$ ( $31 to $50 )</option>
          <option value={[51]}>$$$$ ( $50 and over )</option>
        </select>
        <Button type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Request;
