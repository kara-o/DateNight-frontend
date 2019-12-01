import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRequests } from '../services/api';
import itinerary from '../images/itinerary1.png';

const UserHome = ({ userData }) => {
  const [requests, setRequests] = useState([]);

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

  useEffect(() => {
    if (userData) {
      fetchRequests(userData).then(json => setRequests(json));
    }
  }, [userData]);

  const renderRequests = () => {
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
            </ul>
          </Link>
        </li>
      );
    });
  };

  return (
    <div id='main-page'>
      <Link className='new-request-link' to='/requests/new'>
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
