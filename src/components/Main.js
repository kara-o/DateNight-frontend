import React from 'react';
import { Link } from 'react-router-dom';
import itinerary from '../images/itinerary1.png';

const Main = ({ currentUserData }) => {
  const currentUser = currentUserData.user;

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

  const renderRequests = () => {
    if (currentUser) {
      return currentUser.requests.map(r => {
        return (
          <Link to={`/requests/${r.id}`} id='table-link'>
            <tr key={r.id}>
              <td>{new Date(r.date).toDateString()}</td>
              <td>
                {convertTime(
                  new Date(r.start_time).toTimeString().split(':00 ')[0]
                )}
              </td>
              <td>
                {convertTime(
                  new Date(r.end_time).toTimeString().split(':00 ')[0]
                )}
              </td>
              <td>{r.size}</td>
              <td>
                <i>{r.status}</i>
              </td>
              <td>
                <img src={itinerary} alt='itinerary icon' />
              </td>
            </tr>
          </Link>
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
