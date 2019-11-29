import React, { useState, useEffect } from 'react';
import { fetchRequests } from './api';
import { Link } from 'react-router-dom';

const AdminHome = ({ token }) => {
  const [allRequests, setAllRequests] = useState(null);

  useEffect(() => {
    if (token) {
      fetchRequests(token).then(res => setAllRequests(res));
    }
  }, [token]);

  const renderRequests = () => {
    if (allRequests) {
      const pendingRequests = allRequests.filter(r => r.status !== 'completed');
      return pendingRequests.map(r => {
        return (
          <li key={r.id}>
            <Link to={`/requests/${r.id}`}>
              <ul id='admin-list'>
                <li>{r.date}</li>
              </ul>
            </Link>
          </li>
        );
      });
    }
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
      <ul id='all-requests-list'>{token ? renderRequests() : null}</ul>
    </div>
  );
};

export default AdminHome;
