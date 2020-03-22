import React, { useEffect, useState, useDebugValue } from 'react';
import { Link } from 'react-router-dom';
import { fetchRequests } from '../services/api';
import * as moment from 'moment';
import { Paper } from '@material-ui/core';

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
        <li key={r.id}>
          <Link to={`/requests/${r.id}`}>
            <ul>
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
    pastDates.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
    return pastDates.map(r => {
      return (
        <li key={r.id}>
          <Link to={`/requests/${r.id}`}>
            <ul>
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
      <Paper elevation={10}>
        <h2>Upcoming dates</h2>
        <ul>{renderUncancelledRequests()}</ul>
      </Paper>
      <Paper elevation={10}>
        <h2>Past dates</h2>
        <ul>{renderPastDates()}</ul>
      </Paper>
    </>
  );
};

export default UserHome;
