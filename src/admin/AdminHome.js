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
    const unfulfilledRequests = allRequests.filter(r => !r.fulfilled);
    return unfulfilledRequests.map(r => {
      return (
        <li key={r.id} id='request-row'>
          <Link to={`/admin/requests/${r.id}`} id='request-row-link'>
            <ul id='admin-list'>
              <li>{moment(r.start_time).calendar()}</li>
            </ul>
          </Link>
        </li>
      );
    });
  };

  const handleClick = e => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className='request-list-div'>
        <h2>Unfulfilled Requests</h2>
        <ul className='request-list'>{renderRequests()}</ul>
      </div>
    </>
  );
};

export default AdminHome;
