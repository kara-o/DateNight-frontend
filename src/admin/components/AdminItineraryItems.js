import React, { useState, useEffect } from 'react';
import { scrapeNames } from '../services/api-admin';
import * as moment from 'moment';

const AdminItineraryItems = props => {
  const { userData } = props;
  const [scrapedNames, setScrapedNames] = useState([]);

  useEffect(() => {
    if (userData) {
      scrapeNames(userData, moment().format('YYYY-MM-DD')).then(names =>
        setScrapedNames(names)
      );
    }
  }, []);

  const renderNames = () => {
    if (scrapedNames) {
      return scrapedNames.map(name => {
        return (
          <li key={name.id}>
            <ul>
              <li>{name}</li>
            </ul>
          </li>
        );
      });
    }
  };

  return (
    <>
      {scrapedNames.length > 0 ? (
        <>
          <h1>Itinerary Items</h1>
          <ul>{renderNames()}</ul>
        </>
      ) : null}
    </>
  );
};

export default AdminItineraryItems;
