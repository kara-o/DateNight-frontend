import React, { useEffect, useState, useDebugValue } from 'react';
import { Link } from 'react-router-dom';
import { fetchRequests } from '../services/api';
import * as moment from 'moment';

const UserHome = ({ userData }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (userData) {
      fetchRequests(userData).then(json => setRequests(json));
    }
  }, [userData]);

  const renderUncancelledRequests = () => {
    const uncancelledReqs = requests.filter(
      r => !r.cancelled && new Date(r.start_time) >= new Date()
    );
    return uncancelledReqs.map(r => {
      return (
        <li key={r.id} className='request-row'>
          <Link to={`/requests/${r.id}`}>
            <ul className='upcoming-date-list'>
              <li>{moment(r.start_time).calendar()}</li>
              <li>{r.party_size} people</li>
              <li>{r.neighborhood}</li>
              <li>{r.fulfilled ? 'ITINERARY IS READY' : null}</li>
            </ul>
          </Link>
        </li>
      );
    });
  };

  const renderPastDates = () => {
    const pastDates = requests.filter(
      r => !r.cancelled && new Date(r.start_time) < new Date()
    );
    return pastDates.map(r => {
      return (
        <li key={r.id} className='request-row'>
          <Link to={`/requests/${r.id}`}>
            <ul className='past-date-list'>
              <li>{moment(r.start_time).format('MMMM Do YYYY')}</li>
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
      <div className='list-div'>
        <h2>Upcoming dates</h2>
        <ul className='request-list'>{renderUncancelledRequests()}</ul>
      </div>
      <div className='list-div'>
        <h2>Past dates</h2>
        <ul className='request-list'>{renderPastDates()}</ul>
      </div>
    </>
  );
};

export default UserHome;
