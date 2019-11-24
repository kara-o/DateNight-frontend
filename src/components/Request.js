import React, { useState } from 'react';
import Button from './layout/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cuisines from '../data/cuisines';
import neighborhoods from '../data/neighborhoods';

const Request = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    start_time: '',
    end_time: '',
    cuisine: '',
    neighborhood: '',
    price: ''
  });
  const [errors, setErrors] = useState(null);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDatePickerChange = (value, name) => {
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

  return (
    <div className='request'>
      <form>
        <label for='date'> Date </label>
        <DatePicker
          id='date'
          selected={formData.date}
          onChange={value => handleDatePickerChange(value, 'date')}
        />
        <label for='start-time'> Start Time </label>
        <DatePicker
          id='start-time'
          selected={formData.start_time}
          onChange={value => handleDatePickerChange(value, 'start_time')}
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
          onChange={value => handleDatePickerChange(value, 'end_time')}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption='Time'
          dateFormat='h:mm aa'
        />
        <label for='cuisines'> Cuisine(s) </label>
        <select id='cuisines' multiple>
          {renderOptions(cuisines)}
        </select>
        <label for='neighborhoods'> Neighborhood(s) </label>
        <select id='cuisines' multiple>
          {renderOptions(neighborhoods)}
        </select>
        <label for='prices'> Price Range </label>
        <select id='prices'>
          <option value={[0, 30]}>$$ ( $30 and under )</option>
          <option value={[31, 50]}>$$$ ( $31 to $50 )</option>
          <option value={[51]}>$$$$ ( $50 and over )</option>
        </select>
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default Request;
