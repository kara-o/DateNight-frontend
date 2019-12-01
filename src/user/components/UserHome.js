import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRequests } from '../services/api';
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

  const handleClick = id => {
    setSelectedId(id);
  };

  const renderListItems = () => {
    return requests.map(item => {
      return (
        <ListItem
          key={item.id}
          button
          selected={selectedId === item.id}
          onClick={() => handleClick(item.id)}
        >
          {item.id}
        </ListItem>
      );
    });
  };

  // const renderRequests = () => {
  //   return requests.map(r => {
  //     return (
  //       <li key={r.id} id='request-row'>
  //         <Link to={`/requests/${r.id}`} id='request-row-link'>
  //           <ul className='link-list'>
  //             <li>{r.date}</li>
  //             <li>{r.start + ' - ' + r.end}</li>
  //             <li>{r.size}</li>
  //             <li>
  //               <i>{r.status}</i>
  //             </li>
  //           </ul>
  //         </Link>
  //       </li>
  //     );
  //   });
  // };

  return (
    <div id='main-page'>
      <Link className='new-request-link' to='/requests/new'>
        Make a New Request!
      </Link>
      <div id='request-list-div'>
        <List component='nav'>{renderListItems()}</List>
      </div>
    </div>
  );
};

export default UserHome;
