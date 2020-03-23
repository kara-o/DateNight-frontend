import React, { useEffect, useState, useDebugValue } from 'react';
import { Link } from 'react-router-dom';
import { fetchRequests } from '../services/api';
import * as moment from 'moment';
import ListContainer from '../../layout/ListContainer';
import ListItem from '../../layout/ListItem';

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
        <ListItem key={r.id}>
          <Link to={`/requests/${r.id}`}>
            <ul>
              <li>{moment(r.start_time).calendar()}</li>
              <li>{r.party_size} people</li>
              <li>{r.neighborhood}</li>
              <li>{r.fulfilled ? 'ITINERARY IS READY' : null}</li>
            </ul>
          </Link>
        </ListItem>
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
        <ListItem key={r.id}>
          <Link to={`/requests/${r.id}`}>
            <ul>
              <li>{moment(r.start_time).format('MMMM Do YYYY')}</li>
              <li>{r.party_size} people</li>
              <li>{r.neighborhood}</li>
            </ul>
          </Link>
        </ListItem>
      );
    });
  };

  return requests ? (
    <>
      <ListContainer title='Upcoming Dates'>
        {renderUncancelledRequests()}
      </ListContainer>
      <ListContainer title='Past Dates'>{renderPastDates()}</ListContainer>
    </>
  ) : null;
};

export default UserHome;
