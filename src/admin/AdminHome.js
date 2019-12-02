import React, { useState, useEffect } from 'react';
import { fetchRequests } from './api-admin';
import { Link } from 'react-router-dom';

const AdminHome = props => {
  const { userData } = props;
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    if (userData) {
      fetchRequests(userData).then(json => setAllRequests(json));
    }
  }, [userData]);

  const renderRequests = () => {
    const unfulfilledRequests = allRequests.filter(r => !r.fulfilled);
    return unfulfilledRequests.map(r => {
      return (
        <li key={r.id} id='request-row'>
          <Link to={`/requests/${r.id}`} id='request-row-link'>
            <ul id='admin-list'>
              <li>{r.start_time}</li>
            </ul>
          </Link>
        </li>
      );
    });
  };

  const handleClick = e => {
    console.log(e.target.value);
  };

  return (
    <div id='admin-main-page'>
      <div>
        <h2>Requests</h2>
        <label htmlFor='filter-select'>
          Filter By:
          <select id='filter-select'>
            <option onClick={handleClick}>To Complete</option>
            <option onClick={handleClick}>Completed</option>
            <option onClick={handleClick}>All</option>
          </select>
        </label>
      </div>
      <ul>{renderRequests()}</ul>
    </div>
  );
};

export default AdminHome;
