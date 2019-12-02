import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRequests } from '../services/api';
import * as moment from 'moment';

const UserHome = ({ userData }) => {
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (userData) {
      fetchRequests(userData).then(json => setRequests(json));
    }
  }, [userData]);

  const renderRequests = () => {
    return requests.map(r => {
      return (
        <li key={r.id} id='request-row'>
          <Link
            to={`${userData.user.id}/requests/${r.id}`}
            id='request-row-link'
          >
            <ul className='upcoming-date-list'>
              <li>{moment(r.start_time).calendar()}</li>
              <li>{r.party_size} people</li>
              <li>{r.neighborhood}</li>
            </ul>
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      <Link
        className='new-request-link'
        to={`${userData.user.id}/requests/new`}
      >
        Make a New Request!
      </Link>
      <div className='request-list-div'>
        <h2>Upcoming dates</h2>
        <ul className='request-list'>{renderRequests()}</ul>
      </div>
      <div id='request-list-div'>
        <h2>Past dates</h2>
        <p>TODO</p>
      </div>
    </>
  );
};

export default UserHome;
