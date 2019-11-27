import React, { useEffect, useState } from 'react';
import Button from './layout/Button';
import { api } from '../services/api';
import { updateStatus } from '../../admin/api';

const RequestShow = props => {
  const { currentUser, token } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (currentUser) {
      api.fetchRequest(token, currentUser.id, requestId).then(res => {
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

  const renderStatus = () => {
    if (currentUser) {
      if (currentUser.admin) {
        return (
          <>
            <i>{status}</i>
            <select id='status-select'>
              <option value='requested'>requested</option>
              <option value='reviewed'>reviewed</option>
              <option value='completed'>completed</option>
            </select>
            <Button
              type='submit'
              className='status-update'
              onClick={handleUpdate}
            >
              Update
            </Button>
          </>
        );
      } else {
        return <i>{status}</i>;
      }
    }
  };

  const handleUpdate = e => {
    e.preventDefault();
    const select = document.getElementById('status-select');
    const statusValue = select.options[select.selectedIndex].value;
    updateStatus(token, requestId, statusValue).then(res =>
      setStatus(res.request.status)
    );
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
          </div>
          <div id='status-itinerary-show'>
            <h2 id='status-show'>Status: {renderStatus()}</h2>
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
