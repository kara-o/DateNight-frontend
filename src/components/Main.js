import React from 'react';
import { Link } from 'react-router-dom';

const Main = ({ currentUserData }) => {
  const currentUser = currentUserData.user;

  const renderRequests = () => {
    if (currentUser) {
      return currentUser.requests.map(r => {
        return (
          <tr key={r.id}>
            <td>
              <Link to={`/requests/${r.id}`}>
                {new Date(r.date).toDateString()}
              </Link>
            </td>
            <td>
              <Link>{new Date(r.start_time).toTimeString()}</Link>
            </td>
            <td>
              <Link>{new Date(r.end_time).toTimeString()}</Link>
            </td>
            <td>
              <Link>{r.size}</Link>
            </td>
            <td></td>
            <td></td>
          </tr>
        );
      });
    }
  };

  return (
    <div className='main'>
      <Link className='request-link' to='/request'>
        Make a New Request!
      </Link>
      <div className='request-list'>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Party Size</th>
              <th>Status</th>
              <th>Itinerary</th>
            </tr>
            {renderRequests()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
