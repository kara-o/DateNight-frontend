import React, { useState, useEffect } from 'react';
import Button from './layout/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { api } from '../services/api';
import MultipleSelect from './MultipleSelect';

const Request = ({ currentUserData }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    start_time: '',
    end_time: '',
    size: '2'
  });
  const [errors, setErrors] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [cuisinePickIds, setCuisinePickIds] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [neighborhoodPickIds, setNeighborhoodPickIds] = useState([]);
  const [prices, setPrices] = useState([]);
  const [requestId, setRequestId] = useState('');

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
        <div key={p.id}>
          <input
            type='checkbox'
            id={p.amount}
            name='price-checkbox'
            value={p.id}
          />
          <label htmlFor={p.amount}>{p.amount}</label>
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
    api
      .createRequest(formData, userId, token)
      .then(res => setRequestId(res.request.id));
  };

  const handleOptionsSubmit = e => {
    e.preventDefault();
    const token = currentUserData.jwt;
    const userId = currentUserData.user.id;
    cuisinePickIds.forEach(c => {
      debugger;
      api
        .createSelection(userId, requestId, c, 'cuisine', token)
        .then(console.log);
    });
    neighborhoodPickIds.forEach(n => {
      api
        .createSelection(userId, requestId, n, 'neighborhood', token)
        .then(console.log);
    });
    const priceCheckboxes = document.getElementsByName('price-checkbox');
    priceCheckboxes.forEach(p => {
      if (p.checked) {
        api
          .createSelection(userId, requestId, p.value, 'price', token)
          .then(console.log);
      }
    });
  };

  const handleResponse = res => {
    if (!res.error) {
      console.log('Success!');
    } else {
      console.log(res.error);
    }
  };

  return (
    <>
      <form className='request' autoComplete='off'>
        {requestId ? (
          <div id='form-part-two'>
            <MultipleSelect
              type='cuisines'
              optionsArray={cuisines}
              displayAttribute='category'
              setOptions={setCuisinePickIds}
            />
            <MultipleSelect
              type='neighborhoods'
              optionsArray={neighborhoods}
              displayAttribute='name'
              setOptions={setNeighborhoodPickIds}
            />
            {renderPrices()}
            <Button type='submit' onClick={handleOptionsSubmit}>
              Submit
            </Button>
          </div>
        ) : (
          <div id='form-part-one'>
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
              onChange={e => {
                handleChange(e.target.value, 'size');
              }}
              defaultValue='2'
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
            <Button type='submit' onClick={handleSubmit}>
              Continue
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default Request;
