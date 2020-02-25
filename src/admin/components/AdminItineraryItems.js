import React, { useState, useEffect } from 'react';
import { scrapeNames } from '../services/api-admin';
import { Paper, CircularProgress } from '@material-ui/core/';
import * as moment from 'moment';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  auth: state.auth
});

const AdminItineraryItems = props => {
  const { auth } = props;
  const [scrapedNames, setScrapedNames] = useState([]);

  useEffect(() => {
    if (auth.uid) {
      scrapeNames(auth, moment().format('YYYY-MM-DD')).then(names =>
        setScrapedNames(names)
      );
    }
  }, []);

  const renderNames = () => {
    if (scrapedNames) {
      return scrapedNames.map(name => {
        return (
          <li key={name.id} className='request-row'>
            <ul className='admin-row-list'>
              <li>{name}</li>
            </ul>
          </li>
        );
      });
    }
  };

  const loading = () => {
    return <CircularProgress />;
  };

  return (
    <>
      {scrapedNames.length > 0 ? (
        <>
          <Paper elevation={10} className='paper list-div'>
            <h1>Itinerary Items</h1>
            <ul className='request-list'>{renderNames()}</ul>
          </Paper>
        </>
      ) : (
        <div className='loading-div'>{loading()}</div>
      )}
    </>
  );
};

export default connect(mapStateToProps)(AdminItineraryItems);
