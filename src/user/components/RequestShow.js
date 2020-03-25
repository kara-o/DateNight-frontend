import React, { useEffect, useState } from 'react';
import { Button } from '../../elements';
import { fetchRequest, cancelRequest } from '../services/api';
import * as moment from 'moment';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import ItineraryItem from '../../admin/components/ItineraryItem';
import QuestionModal from '../../elements/QuestionModal';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({});

const RequestShow = props => {
  const { userData } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    if (userData) {
      fetchRequest(userData, requestId).then(res => {
        setRequest(res.request);
      });
    }
  }, [userData]);

  const renderContacts = () => {
    return request.contacts.map((c, i) => {
      return (
        <li key={c.id}>
          Contact #{i + 1}: {c.phone}
        </li>
      );
    });
  };

  const renderItinerary = () => {
    return (
      <>
        {request.fulfilled ? (
          new Date(request.start_time) > new Date() ? (
            <div elevation={10} elevation={10}>
              <p>
                Get excited! Your itinerary is all set. You will be getting text
                alerts starting on the morning of your date!
              </p>
            </div>
          ) : (
            <>
              {!request.itinerary_items.length
                ? 'Empty'
                : request.itinerary_items.map(item => (
                    <ItineraryItem key={item.id} item={item} />
                  ))}
            </>
          )
        ) : (
          <div elevation={10} elevation={10}>
            <p>We are busy working to get your night out all set up!</p>
            <p>
              Check back soon for confirmation that your itinerary is ready...
            </p>
          </div>
        )}
      </>
    );
  };

  const friendlyRelativeDate = () => {
    const dateDay = moment(request.start_time).startOf('h:mm a');
    const now = moment();
    if (dateDay < now) {
      return `Your date was ${dateDay.fromNow()}`;
    } else if (dateDay.diff(now, 'days') < 2) {
      return 'Your date is tomorrow';
    } else {
      return `Your date is ${dateDay.fromNow()}`;
    }
  };

  const handleCancel = () => {
    cancelRequest(userData, requestId).then(props.history.push('/'));
  };

  return (
    <>
      {request ? (
        <>
          <div>
            <div>
              <h2>{friendlyRelativeDate()}!</h2>
              <p>Date: {moment(request.start_time).format('MMMM Do YYYY')}</p>
              <p>Time: {moment(request.start_time).format('h:mm a')}</p>
              <p>Party: {request.party_size} people</p>
              <ul>{renderContacts()}</ul>
              <p>Neighborhood: {request.neighborhood}</p>
              <p>Price Range: {request.price_range}</p>
              {request.notes ? <p>Notes: {request.notes}</p> : null}
              {new Date(request.start_time) >= new Date() ? (
                <QuestionModal
                  question='Are you sure you want to cancel this request?'
                  decline='No way!'
                  accept='Yes, please cancel.'
                  handleCancel={handleCancel}
                />
              ) : null}
            </div>
          </div>
          <div>
            {' '}
            <div>{renderItinerary()}</div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default RequestShow;
