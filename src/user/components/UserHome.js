import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import itinerary from '../images/itinerary1.png';

const UserHome = ({ currentUser, token }) => {
  const [requests, setRequests] = useState(null);

  // const convertTime = string => {
  //   let end = '';
  //   const arr = string.split(':');
  //   let first = parseInt(arr[0], 10);
  //   if (first > 12) {
  //     end = 'PM';
  //     first -= 12;
  //   }
  //   return `${first}:${arr[1]} ${end}`;
  // };

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
      console.log(requests);
      return requests.map(r => {
        return (
          <li key={r.id} id='request-row'>
            <Link to={`/requests/${r.id}`} id='request-row-link'>
              <ul className='link-list'>
                <li>{r.date}</li>
                <li>{r.start + ' - ' + r.end}</li>
                <li>{r.size}</li>
                <li>
                  <i>{r.status}</i>
                </li>
                <li>
                  {r.status === 'completed' ? (
                    <img
                      src={itinerary}
                      alt='itinerary icon'
                      onClick={handleClick}
                    />
                  ) : null}
                </li>
              </ul>
            </Link>
          </li>
        );
      });
    }
  };

  return (
    <div id='main-page'>
      <Link className='new-request-link' to='/request'>
        Make a New Request!
      </Link>
      <div id='request-list-div'>
        <ul className='header-list'>
          <li>Date</li>
          <li>Window</li>
          <li>Party Size</li>
          <li>Status</li>
          <li>Itinerary</li>
        </ul>
        <ul className='request-list'>{renderRequests()}</ul>
      </div>
    </div>
  );
};

export default UserHome;
