import React, { useEffect, useState } from 'react';
import Button from '..//layout/Button';
import { fetchRequest } from './api-admin';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//props, userData

const AdminRequestShow = props => {
  const { userData } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (userData) {
      fetchRequest(userData, requestId).then(res => {
        console.log(res);
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

export default AdminRequestShow;
