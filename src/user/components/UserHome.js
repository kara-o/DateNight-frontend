import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRequests } from '../services/api';
import * as moment from 'moment';
import itinerary from '../images/itinerary1.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const UserHome = ({ userData }) => {
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

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

  // const handleClick = id => {
  //   setSelectedId(id);
  // };

  // const renderListItems = () => {
  //   return requests.map(item => {
  //     return (
  //       <Link to={`/requests/${item.id}`}>
  //         <ListItem
  //           key={item.id}
  //           button
  //           selected={selectedId === item.id}
  //           onClick={() => handleClick(item.id)}
  //         >
  //           {item.id}
  //         </ListItem>
  //       </Link>
  //     );
  //   });
  // };

  const renderRequests = () => {
    return requests.map(r => {
      return (
        <li key={r.id} id='request-row'>
          <Link to={`/requests/${r.id}`} id='request-row-link'>
            <ul className='upcoming-date-list'>
              <li>{moment(r.start_time).calendar()}</li>
              <li>{r.party_size} people</li>
              <li>{r.neighborhood}</li>
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
        <h2>Upcoming dates</h2>
        <ul id='request-list'>{renderRequests()}</ul>
      </div>
      <div id='request-list-div'>
        <h2>Past dates</h2>
        <p>TODO</p>
      </div>
    </div>
  );
};

export default UserHome;
