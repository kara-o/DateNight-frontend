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

  return (
    <div id='admin-main'>
      <h2>All Requests</h2>
      <ul id='all-requests-list'>{token ? renderRequests() : null}</ul>
    </div>
  );
};

export default AdminHome;
