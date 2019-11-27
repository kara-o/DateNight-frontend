import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import itinerary from '../images/itinerary1.png';

const Main = ({ currentUser, token }) => {
  const [requests, setRequests] = useState(null);

  const convertTime = string => {
    let end = '';
    const arr = string.split(':');
    let first = parseInt(arr[0], 10);
    if (first > 12) {
      end = 'PM';
      first -= 12;
    }
    return `${first}:${arr[1]} ${end}`;
  };

  const handleClick = e => {
    console.log('itinerary!');
  };

  useEffect(() => {
    if (currentUser) {
      api.fetchRequests(currentUser.id, token).then(res => setRequests(res));
    }
  }, [currentUser]);

  const renderRequests = () => {
    if (requests) {
      return requests.map(r => {
        return (
          <div key={r.id} id='request-row'>
            <Link to={`/requests/${r.id}`} id='request-row-link'>
              <ul className='link-list'>
                <li>{new Date(r.date).toDateString()}</li>
                <li>
                  {convertTime(
                    new Date(r.start_time).toTimeString().split(':00 ')[0]
                  ) +
                    ' - ' +
                    convertTime(
                      new Date(r.end_time).toTimeString().split(':00 ')[0]
                    )}
                </li>
                <li>{r.size}</li>
                <li>
                  <i>{r.status}</i>
                </li>
                <li>
                  {r.status === 'complete' ? (
                    <img
                      src={itinerary}
                      alt='itinerary icon'
                      onClick={handleClick}
                    />
                  ) : null}
                </li>
              </ul>
            </Link>
          </div>
        );
      });
    }
  };

  return (
    <div className='main'>
      <Link className='new-request-link' to='/request'>
        Make a New Request!
      </Link>
      <div className='request-list'>
        <div id='request-headers'>
          <ul className='link-list'>
            <li>Date</li>
            <li>Window</li>
            <li>Party Size</li>
            <li>Status</li>
            <li>Itinerary</li>
          </ul>
        </div>
        {renderRequests()}
      </div>
    </div>
  );
};

export default Main;
