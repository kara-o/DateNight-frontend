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
      <div>
        <Button variant='outlined' color='primary' onClick={handleClickOpen}>
          Cancel
        </Button>
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
          <DialogActions>
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

  return (
    <>
      {request ? (
        <Paper className='paper'>
          <h2>
            Your date is
            {' ' +
              moment(request.start_time)
                .startOf('h:mm a')
                .fromNow()}
            !
          </h2>
          <p>Date: {moment(request.start_time).format('MMMM Do YYYY')}</p>
          <p>Time: {moment(request.start_time).format('h:mm a')}</p>
          <p>Party: {request.party_size} people</p>
          <ul>{renderContacts()}</ul>
          <p>Neighborhood: {request.neighborhood}</p>
          <p>Price Range: {request.price_range}</p>
          {renderAlert()}
        </Paper>
      ) : null}
    </>
  );
};

export default RequestShow;
