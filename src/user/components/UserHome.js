import React, { useEffect, useState, useDebugValue } from 'react';
import { Link } from 'react-router-dom';
import { fetchRequests } from '../services/api';
import * as moment from 'moment';
import ListContainer from '../../layout/ListContainer';
import ListItem from '../../layout/ListItem';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  upcoming: {
    gridColumn: '1/3',
    gridRow: '2/3'
  },
  past: {
    gridColumn: '1/3',
    gridRow: '3/4'
  }
});

const UserHome = ({ userData }) => {
  const [requests, setRequests] = useState([]);
  const classes = useStyles();

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
        <Link to={`/requests/${r.id}`}>
          <ListItem key={r.id}>
            <p>{moment(r.start_time).calendar()}</p>
            <p>{r.party_size} people</p>
            <p>{r.neighborhood}</p>
            <p>{r.fulfilled ? 'ITINERARY IS READY' : null}</p>
          </ListItem>
        </Link>
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
        <Link to={`/requests/${r.id}`}>
          <ListItem key={r.id}>
            <p>{moment(r.start_time).format('MMMM Do YYYY')}</p>
            <p>{r.party_size} people</p>
            <p>{r.neighborhood}</p>
          </ListItem>
        </Link>
      );
    });
  };

  return requests ? (
    <>
      <ListContainer title='Upcoming Dates' styles={classes.upcoming}>
        {renderUncancelledRequests()}
      </ListContainer>
      <ListContainer title='Past Dates' styles={classes.past}>
        {renderPastDates()}
      </ListContainer>
    </>
  ) : null;
};

export default UserHome;
