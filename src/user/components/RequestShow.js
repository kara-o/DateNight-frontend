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
      });
    }
  }, [userData]);

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
          <p>{moment(request.start_time).format('MMMM Do YYYY, h:mm a')}</p>
        </Paper>
      ) : null}
    </>
  );
};

export default RequestShow;
