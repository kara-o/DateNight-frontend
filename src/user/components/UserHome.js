import React, { useEffect, useState, useDebugValue } from 'react';
import { fetchRequests, cancelRequest } from '../services/api';
import * as moment from 'moment';
import { ListContainer, ListItem } from '../../elements';
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

const UserHome = props => {
  const { userData } = props;
  const [requests, setRequests] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    console.log(props.location.state);
    if (userData) {
      console.log('fetching requests!');
      fetchRequests(userData).then(json => setRequests(json));
    }
  }, [userData]);

  const renderUncancelledRequests = () => {
    const uncancelledReqs = requests.filter(
      r => !r.cancelled && new Date(r.start_time) >= new Date()
    );
    return uncancelledReqs.map(r => {
      return (
        <ListItem key={r.id} id={r.id} destination={`/requests/${r.id}`}>
          <p>{moment(r.start_time).calendar()}</p>
          <p>{r.party_size} people</p>
          <p>{r.neighborhood}</p>
          <p>{r.fulfilled ? 'ITINERARY IS READY' : null}</p>
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
        <ListItem key={r.id} id={r.id} destination={`/requests/${r.id}`}>
          <p></p>
          <p>{moment(r.start_time).format('MMMM Do YYYY')}</p>
          <p>{placeNamesToString(r)}</p>
          <p></p>
        </ListItem>
      );
    });
  };

  const placeNamesToString = request => {
    let stringOfNames = '';
    const arrayOfNames = request.itinerary_items.map(item => {
      return item.place;
    });
    for (let i = 0; i < arrayOfNames.length; i++) {
      if (i > 0) {
        stringOfNames += ', ';
      }
      stringOfNames += arrayOfNames[i];
    }
    return stringOfNames;
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
