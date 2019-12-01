import React, { useState, useEffect } from 'react';
import Button from './layout/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchOptions, createRequest } from '../services/api';
import MultipleSelect from './MultipleSelect';

const Request = props => {
  const { currentUser, token } = props;
  const [formData, setFormData] = useState({
    date: new Date(),
    start_time: '',
    end_time: '',
    size: '2'
  });
  const [errors, setErrors] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [cuisinePicks, setCuisinePicks] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [neighborhoodPicks, setNeighborhoodPicks] = useState([]);
  const [prices, setPrices] = useState([]);
  const [partOne, setPartOne] = useState(true);

  //TODO add loading
  useEffect(() => {
    if (token) {
      fetchOptions('cuisines', token).then(res => {
        setCuisines(res);
      });
      fetchOptions('neighborhoods', token).then(res => {
        setNeighborhoods(res);
      });
      fetchOptions('prices', token).then(res => setPrices(res));
    }
  }, [token]);

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
    const prices = document.getElementsByName('price-checkbox');
    const checkedPrices = [];
    for (const checkbox of prices) {
      if (checkbox.checked) {
        checkedPrices.push({ ['price_id']: checkbox.value });
      }
    }
    createRequest(
      formData,
      currentUser.id,
      token,
      cuisinePicks,
      neighborhoodPicks,
      checkedPrices
    ).then(res => {
      if (!res.errors) {
        props.history.push('/');
      } else {
        setErrors({
          errorObj: res.errors.error_obj,
          fullMessages: res.errors.full_messages
        });
      }
    });
  };

  const renderErrors = errors => {
    return errors.fullMessages.map((error, idx) => <li key={idx}>{error}</li>);
  };

  const handleClick = e => {
    e.preventDefault();
    const text = e.target.textContent;
    if (text === 'Continue') {
      setPartOne(false);
    } else if (text === 'Back') {
      setPartOne(true);
    }
  };

  return (
    <div id='request-form-page'>
      <form id='new-request-form' autoComplete='off'>
        <ul className='errors'>{errors ? renderErrors(errors) : null}</ul>
        {partOne ? (
          <div id='form-part-one'>
            <div id='date-picker'>
              Date
              <DatePicker
                selected={formData.date}
                onChange={value => handleChange(value, 'date')}
              />
            </div>
            <div id='time-select'>
              Start Time
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
              End Time
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
            </div>
            <div id='party-size'>
              Party Size{' '}
              <select
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
            </div>
            <Button className='continue' type='button' onClick={handleClick}>
              Continue
            </Button>
          </div>
        ) : (
          <div id='form-part-two'>
            <div id='cuisine-select' className='select'>
              Cuisine(s){' '}
              <MultipleSelect
                type='cuisine'
                optionsArray={cuisines}
                displayAttribute='category'
                setOptions={setCuisinePicks}
              />
            </div>
            <div id='neighborhood-select' className='select'>
              Neighborhood(s){' '}
              <MultipleSelect
                type='neighborhood'
                optionsArray={neighborhoods}
                displayAttribute='name'
                setOptions={setNeighborhoodPicks}
              />
            </div>
            <div id='price-select' className='select'>
              Price Range(s)
              {renderPrices()}
            </div>
            <div id='buttons'>
              <Button
                type='button'
                onClick={() => {
                  setPartOne(true);
                }}
              >
                Back
              </Button>
              <Button type='submit' onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Request;
