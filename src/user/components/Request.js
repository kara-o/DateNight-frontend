import React, { useState, useEffect } from 'react';
import { Button, QuestionModal } from '../../elements';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { fetchOptions, createRequest } from '../services/api';
import * as moment from 'moment';
import {
  TextField,
  MenuItem,
  FormLabel,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';

const DEFAULT_DATE_LENGTH_HOURS = 4;

function thisFriday() {
  const dayINeed = 5; // Friday
  const today = moment().isoWeekday();

  if (today < dayINeed) {
    return moment()
      .add(dayINeed - today, 'days')
      .toDate();
  } else if (today > dayINeed) {
    return moment()
      .add(7 - today + dayINeed, 'days')
      .toDate();
  } else {
    return moment()
      .add(1, 'week')
      .toDate();
  }
}

function tomorrow() {
  return moment()
    .add(1, 'days')
    .toDate();
}

function defaulStartTime() {
  return new Date(2000, 1, 1, 19, 0, 0);
}

const Request = props => {
  const { userData } = props;
  const [formData, setFormData] = useState({
    start_date: thisFriday(),
    start_time: defaulStartTime(),
    party_size: '2',
    notes: ''
  });
  const [neighborhoodSelection, setNeighborhoodSelection] = useState(null);
  const [priceRangeSelection, setPriceRangeSelection] = useState(null);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [contacts, setContacts] = useState([userData.user.phone]);
  const [errors, setErrors] = useState(null);
  const [open, setOpen] = useState(false);

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

  const getPostData = () => {
    const startDate = new Date(
      formData.start_date.getFullYear(),
      formData.start_date.getMonth(),
      formData.start_date.getDate(),
      formData.start_time.getHours(),
      formData.start_time.getMinutes()
    );
    const endDate = moment(startDate)
      .add(DEFAULT_DATE_LENGTH_HOURS, 'hours')
      .toDate();
    const data = {
      ...formData,
      start_time: startDate.toString(),
      end_time: endDate.toString(),
      neighborhood_id: neighborhoodSelection,
      price_range_id: priceRangeSelection,
      contacts_attributes: contacts.map(contact => ({
        phone: contact
      }))
    };
    delete data.start_date;
    delete data.end_date;
    return data;
  };

  const handleClose = () => {
    setOpen(false);
    props.history.push('/');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = getPostData();

    return createRequest(data, userData).then(json => {
      if (!json.errors) {
        console.log('sucessfully created request!', json);
        return json;
      } else {
        console.log('errors creating request!');
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
        <MenuItem key={o.id} value={o.id}>
          {o[`${attribute}`]}
        </MenuItem>
      );
    });
  };

  if (neighborhoodSelection === null || priceRangeSelection === null) {
    return (
      <form className='create-form' autoComplete='off'>
        <p>Loading...</p>
      </form>
    );
  }

  return (
    <>
      <Paper elevation={10}>
        <form autoComplete='off'>
          <ul>{errors ? renderErrors(errors) : null}</ul>
          <fieldset className='datepickers unstyled'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                label='Date'
                minDate={tomorrow()}
                value={formData.start_date}
                onChange={date => handleChange(date, 'start_date')}
              />
              <KeyboardTimePicker
                disableToolbar
                variant='inline'
                minutesStep={30}
                margin='normal'
                label='Time'
                value={formData.start_time}
                onChange={time => handleChange(time, 'start_time')}
              />
            </MuiPickersUtilsProvider>
          </fieldset>
          <TextField
            select
            label='Party size'
            className='select party-size-picker'
            value={formData.party_size}
            onChange={e => handleChange(e.target.value, 'party_size')}
            margin='normal'
          >
            <MenuItem value='1'>1</MenuItem>
            <MenuItem value='2'>2</MenuItem>
            <MenuItem value='3'>3</MenuItem>
            <MenuItem value='4'>4</MenuItem>
          </TextField>
          <TextField
            select
            label='Neighborhood'
            className='select neighborhood-picker'
            value={neighborhoodSelection}
            onChange={e => setNeighborhoodSelection(e.target.value)}
            margin='normal'
          >
            {renderOptions(neighborhoods, 'name')}
          </TextField>
          <TextField
            select
            label='Price range'
            className='select price-picker'
            value={priceRangeSelection}
            onChange={e => setPriceRangeSelection(e.target.value)}
            margin='normal'
          >
            {renderOptions(priceRanges, 'max_amount')}
          </TextField>
          <fieldset className='contacts unstyled'>
            <FormLabel className='contacts-group-label'>
              Contact phone numbers (up to 4)
            </FormLabel>
            {contacts
              .concat([''])
              .slice(0, 4) // limit to 4
              .map((contact, i) => (
                <TextField
                  key={i}
                  label={`Phone ${i + 1}`}
                  variant='outlined'
                  value={contact}
                  inputProps={{
                    type: 'tel'
                  }}
                  onChange={e => updateContactAt(e.target.value, i)}
                />
              ))}
          </fieldset>
          <TextField
            multiline
            rows={3}
            label='Notes'
            className='textarea notes'
            value={formData.notes}
            onChange={e => handleChange(e.target.value, 'notes')}
            margin='normal'
          />
          <QuestionModal
            questionText='Success! We will get busy setting up your perfect night out! You
            will get your first text on the day of your date at 10 am!'
            acceptText="Can't Wait!"
            navigateAwayAction={handleClose}
            buttonText='Submit Request'
            onClick={handleSubmit}
          />
        </form>
      </Paper>
      <Paper elevation={10}>
        <h3>
          Let us create a fun night for you! Give us some guidance through this
          request form, and we will do our best to make it all happen!
        </h3>
        <p>
          Choose the day and time for your date. Depending on your budget and
          special instructions, we will schedule up to a total duration of 4
          hours.
        </p>
        <p>Which area of Seattle do you want to go to?</p>
        <p>
          How big is your party? Let us know, we don't assume that everyone is a
          couple of 2 and we can make reservations for up to 4 people!
        </p>
        <p>
          Let us know your approximate budget per person. We cannot guarantee we
          will be exact, but we always try our best!
        </p>
        <p>
          Provide us up to four contact numbers where we will send text alerts
          containing your itinerary!
        </p>
        <p>
          Leave us any special requests in the notes sections, such as dietary
          restrictions/time constraints, etc. We want to make this night perfect
          for you!
        </p>

        <h3>Press submit when you're done!</h3>
      </Paper>
    </>
  );
};

export default Request;
