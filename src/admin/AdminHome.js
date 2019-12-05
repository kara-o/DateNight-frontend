import React, { useState, useEffect } from 'react';
import { fetchRequests } from './api-admin';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { Select, MenuItem, InputLabel, Paper } from '@material-ui/core/';

const AdminHome = props => {
  const { userData } = props;
  const [allRequests, setAllRequests] = useState([]);
  const [filter, setFilter] = useState('Unfulfilled');

  useEffect(() => {
    if (userData) {
      console.log(userData.user.first_name);
      fetchRequests(userData).then(json => setAllRequests(json));
    }
  }, [userData]);

  const renderRequests = () => {
    let requests;
    if (filter === 'unfulfilled') {
      requests = allRequests.filter(r => !r.fulfilled);
    } else {
      requests = allRequests;
    }
    return requests.map(r => {
      return (
        <li key={r.id} className='request-row'>
          <Link to={`/admin/requests/${r.id}`}>
            <ul
              style={r.cancelled ? { color: 'red' } : null}
              className='admin-row-list'
            >
              <li>{moment(r.start_time).calendar()}</li>
              <li>{r.cancelled ? <span>CANCELLED</span> : null}</li>
            </ul>
          </Link>
        </li>
      );
    });
  };

  const handleChange = e => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  const renderFilter = () => {
    return (
      <div className='filter'>
        <InputLabel id='select-label'>Filter</InputLabel>
        <Select labelId='select-label' value={filter} onChange={handleChange}>
          <MenuItem value={'Unfulfilled'}>Unfulfilled</MenuItem>
          <MenuItem value={'All'}>All</MenuItem>
        </Select>
      </div>
    );
  };

  return (
    <Paper elevation={10} className='list-div paper'>
      <h1>{filter} Requests</h1>
      {renderFilter()}
      <ul className='request-list'>{renderRequests()}</ul>
    </Paper>
  );
};

export default AdminHome;
