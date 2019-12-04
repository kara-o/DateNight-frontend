import React, { useState, useEffect } from 'react';
import { fetchRequests } from './api-admin';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

const AdminHome = props => {
  const { userData } = props;
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    if (userData) {
      console.log(userData.user.first_name);
      fetchRequests(userData).then(json => setAllRequests(json));
    }
  }, [userData]);

  const renderRequests = () => {
    const unfulfilledReqs = allRequests.filter(r => !r.fulfilled);
    return unfulfilledReqs.map(r => {
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

  return (
    <div className='list-div'>
      <h1>Unfulfilled Requests</h1>
      <ul className='request-list'>{renderRequests()}</ul>
    </div>
  );
};

export default AdminHome;
