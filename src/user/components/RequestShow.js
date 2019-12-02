import React, { useEffect, useState } from 'react';
import Button from '../../layout/Button';
import { fetchRequest } from '../services/api';
import { Link } from 'react-router-dom';

const RequestShow = props => {
  const { currentUser, token } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (currentUser) {
      fetchRequest(token, currentUser.id, requestId).then(res => {
        setRequest(res.request);
        setStatus(res.request.status);
      });
    }
  }, [currentUser]);

  const renderSelections = (array, attribute) => {
    return array.map(selection => {
      return <li key={selection.id}>{selection[`${attribute}`]}</li>;
    });
  };

  return (
    <div id='show-page'>
      {request ? (
        <>
          <div id='request-show'>
            {currentUser.admin ? (
              <>
                <h2>User: {request.user.username}</h2>
                <h2>Date: {request.date}</h2>
              </>
            ) : (
              <p>Date: {request.date}</p>
            )}

            <p>Window: {request.start + ' - ' + request.end}</p>
            <p>Party Size: {request.size}</p>
            <div>
              Cuisines:<ul>{renderSelections(request.cuisines, 'category')}</ul>
            </div>
            <div>
              Neighborhoods:
              <ul>{renderSelections(request.neighborhoods, 'name')}</ul>
            </div>
            <div>
              Prices:<ul>{renderSelections(request.prices, 'amount')}</ul>
            </div>
            <p>{request.created_at}</p>
            {status === 'requested' && !currentUser.admin ? (
              <Link to={`/requests/${request.id}/edit`}>Edit Your Request</Link>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default RequestShow;
