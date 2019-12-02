import React, { useEffect, useState } from 'react';
import Button from '../../layout/Button';
import { fetchRequest } from '../services/api';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import { Paper, Typography } from '@material-ui/core';

//props, userData

const RequestShow = props => {
  const { userData } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (userData) {
      fetchRequest(userData, requestId).then(res => {
        setRequest(res.request);
        console.log(res.request);
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
          <p>Date: {moment(request.start_time).format('h:mm a')}</p>
          <p>Party: {request.party_size} people</p>
          <ul>{renderContacts()}</ul>
          <p>Neighborhood: {request.neighborhood}</p>
          <p>Price Range: {request.price_range}</p>
        </Paper>
      ) : null}
    </>
  );
};

export default RequestShow;
