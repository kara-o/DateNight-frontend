import React, { useEffect, useState } from 'react';
import Button from '../../layout/Button';
import { fetchRequest, cancelRequest } from '../services/api';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Paper, Typography } from '@material-ui/core';
import ItineraryItem from '../../admin/ItineraryItem';

const RequestShow = props => {
  const { userData } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);
  const [open, setOpen] = useState(false);

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
        <li key={c.id} className='contact'>
          Contact #{i + 1}: {c.phone}
        </li>
      );
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    cancelRequest(userData, requestId).then(console.log);
    props.history.push('/');
  };

  const renderAlert = () => {
    return (
      <div className='cancel-button-div'>
        {new Date(request.start_time) >= new Date() ? (
          <Button variant='outlined' color='primary' onClick={handleClickOpen}>
            Cancel
          </Button>
        ) : null}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to cancel this request?
            </DialogContentText>
          </DialogContent>
          <DialogActions className='modal-btns'>
            <Button onClick={handleClose} color='primary'>
              No way!
            </Button>
            <Button onClick={handleCancel} color='primary' autoFocus>
              Yes, please cancel.
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const renderItinerary = () => {
    return (
      <div className='itinerary'>
        {new Date(request.start_time) > new Date() ? (
          <>
            <h2>Itinerary</h2>
            <Paper elevation={10} className='paper request-show' elevation={10}>
              <h2>
                Get excited! Your itinerary is all set. You will be getting text
                alerts starting on the morning of your date!
              </h2>
            </Paper>
          </>
        ) : (
          <>
            <h2>Itinerary</h2>
            {!request.itinerary_items.length
              ? 'Empty'
              : request.itinerary_items.map(item => (
                  <ItineraryItem key={item.id} item={item} />
                ))}
          </>
        )}
      </div>
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

  return (
    <>
      {request ? (
        <div className='show'>
          <h2>Request</h2>
          <Paper elevation={10} className='paper request-show' elevation={10}>
            <h2>{friendlyRelativeDate()}!</h2>
            <p>Date: {moment(request.start_time).format('MMMM Do YYYY')}</p>
            <p>Time: {moment(request.start_time).format('h:mm a')}</p>
            <p>Party: {request.party_size} people</p>
            <ul>{renderContacts()}</ul>
            <p>Neighborhood: {request.neighborhood}</p>
            <p>Price Range: {request.price_range}</p>
            {request.notes ? <p>Notes: {request.notes}</p> : null}
            {renderAlert()}
          </Paper>
        </div>
      ) : null}
      {request && request.fulfilled ? renderItinerary() : null}
    </>
  );
};

export default RequestShow;
