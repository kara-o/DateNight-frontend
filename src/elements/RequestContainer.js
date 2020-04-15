import React from 'react';
import * as moment from 'moment';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  details: {
    marginTop: '0px'
  }
});

const RequestContainer = ({ title, request, children, admin = false }) => {
  const classes = useStyles();

  const renderContacts = request => {
    return request.contacts.map((c, i) => {
      return (
        <li key={c.id}>
          Contact #{i + 1}: {c.phone}
        </li>
      );
    });
  };

  return (
    <div className={classes.container}>
      <h2>{title}</h2>
      <div className={classes.details}>
        <p>Date: {moment(request.start_time).format('MMMM Do YYYY')}</p>
        <p>Time: {moment(request.start_time).format('h:mm a')}</p>
        <p>Party: {request.party_size} people</p>
        <ul>{renderContacts(request)}</ul>
        <p>Neighborhood: {request.neighborhood}</p>
        <p>Price Range: {request.price_range}</p>
        <p>Notes: {request.notes}</p>
        {admin ? (
          <p>
            Fulfilled: {(!!request.fulfilled).toString()}{' '}
            {request.cancelled ? (
              <span>
                <strong style={{ color: 'red' }}>CANCELLED</strong>
              </span>
            ) : null}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
};

export default RequestContainer;
