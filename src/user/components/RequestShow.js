import React, { useEffect, useState } from 'react';
import Button from '../../layout/Button';
import { fetchRequest } from '../services/api';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//props, userData

const RequestShow = props => {
  const { userData } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (userData) {
      console.log(userData, requestId);
      fetchRequest(userData, requestId).then(res => {
        setRequest(res.request);
      });
    }
  }, [userData]);

  return (
    <>
      {request ? (
        <Paper className=''>
          <Typography variant='h5' component='h3'>
            This is a sheet of paper.
          </Typography>
          <Typography component='p'>
            Paper can be used to build surface or other elements for your
            application.
          </Typography>
        </Paper>
      ) : null}
    </>
  );
};

export default RequestShow;
