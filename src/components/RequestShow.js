import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

const RequestShow = props => {
  const currentUser = props.currentUserData.user;
  const token = props.currentUserData.jwt;
  const requestId = props.match.params.id;

  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (currentUser) {
      api
        .fetchRequest(token, currentUser.id, requestId)
        .then(res => setRequest(res.request));
    }
  }, [currentUser]);

  const renderSelections = (array, attribute) => {
    console.log(array);
    return array.map(selection => {
      return <li>{selection[`${attribute}`]}</li>;
    });
  };

  return (
    <div id='show-page'>
      {request ? (
        <>
          <div id='request-show'>
            <p>Date: {request.date}</p>
            <p>Window: {request.start + ' - ' + request.end}</p>
            <p>Party Size: {request.size}</p>
            <p>
              Cuisines:<ul>{renderSelections(request.cuisines, 'category')}</ul>
            </p>
            <p>
              Neighborhoods:
              <ul>{renderSelections(request.neighborhoods, 'name')}</ul>
            </p>
            <p>
              Prices:<ul>{renderSelections(request.prices, 'amount')}</ul>
            </p>
            <p>Created: {request.created_at}</p>
          </div>
          <div id='status-itinerary-show'>
            <h2 id='status-show'>
              Status: <i>{request.status}</i>
            </h2>
            <p>
              {request.itinerary
                ? 'Itinerary link is here!'
                : 'Check here on the morning of your date for your itinerary!'}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default RequestShow;
