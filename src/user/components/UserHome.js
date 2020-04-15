import React, { useEffect, useState, useDebugValue } from 'react';
import { fetchRequests, cancelRequest } from '../services/api';
import * as moment from 'moment';
import { ListContainer, ListItem, Stars } from '../../elements';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  mainContainer: {
    gridArea: 'main',
    width: '100%',
    padding: '50px'
  }
});

const UserHome = props => {
  const { userData } = props;
  const [requests, setRequests] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (userData) {
      console.log('fetching requests!', props.location.state);
      fetchRequests(userData).then(json => setRequests(json));
    }
  }, [props.location.state, userData]); //TODO do I really need props.location.state

  const renderUncancelledRequests = () => {
    const uncancelledReqs = requests.filter(
      r => !r.cancelled && new Date(r.start_time) >= new Date()
    );

    if (uncancelledReqs.length) {
      return uncancelledReqs.map(r => {
        return (
          <ListItem key={r.id} id={r.id} destination={`/requests/${r.id}`}>
            <p>{moment(r.start_time).calendar()}</p>
            <p>{r.neighborhood}</p>
            <p>{r.fulfilled ? 'ITINERARY IS READY' : 'ITINERARY PENDING'}</p>
          </ListItem>
        );
      });
    }
    return <p className={classes.noDates}>Book some nights out!</p>;
  };

  const renderPastDates = () => {
    const pastDates = requests.filter(
      r => !r.cancelled && new Date(r.start_time) < new Date()
    );
    if (pastDates.length) {
      pastDates.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
      return pastDates.map(r => {
        return (
          <ListItem key={r.id} id={r.id} destination={`/requests/${r.id}`}>
            <p>{moment(r.start_time).format('MMMM Do YYYY')}</p>
            <p>{placeNamesToString(r)}</p>
            <p>{r.review ? <Stars review={r.review} /> : 'Review this date!'.italics()}</p>
          </ListItem>
        );
      });
    }
    return <p>{('Your past dates will go here!').italics()}</p>;
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
    <div className={classes.mainContainer}>
      <ListContainer title='Upcoming Dates'>
        {renderUncancelledRequests()}
      </ListContainer>
      <ListContainer title='Past Dates'>{renderPastDates()}</ListContainer>
    </div>
  ) : null;
};

export default UserHome;
