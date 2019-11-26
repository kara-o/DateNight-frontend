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
    <>
      {request ? (
        <div className='request show'>
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
      ) : null}
    </>
  );
};

export default RequestShow;
