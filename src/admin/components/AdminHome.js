import React, { useState, useEffect } from 'react';
import { fetchRequests } from '../services/api-admin';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { Select, MenuItem, InputLabel, Paper } from '@material-ui/core/';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  auth: state.auth
});

const AdminHome = props => {
  const { auth } = props;
  const [allRequests, setAllRequests] = useState([]);
  const [filter, setFilter] = useState('Unfulfilled');

  useEffect(() => {
    if (auth.uid) {
      fetchRequests(auth).then(json => setAllRequests(json));
    }
  }, []);

  const renderRequests = () => {
    let requests;
    if (filter === 'Unfulfilled') {
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

export default connect(mapStateToProps)(AdminHome);
