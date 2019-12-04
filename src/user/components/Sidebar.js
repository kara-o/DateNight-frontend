import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import * as moment from 'moment';

const Sidebar = ({ userData }) => {
  const renderInitials = () => {
    if (!userData.admin) {
      return (
        `${userData.user.first_name.slice(0, 1)}` +
        `${userData.user.last_name.slice(0, 1)}`
      );
    } else {
      return 'ADMIN';
    }
  };

  return (
    <div className='sidebar'>
      <Avatar id='avatar'>{renderInitials()}</Avatar>
      {userData && !userData.admin ? (
        <ul className='sidebar-list'>
          <li>
            <strong>
              {userData.user.first_name + ' ' + userData.user.last_name}
            </strong>
          </li>
          <br />
          <li>
            Joined: {moment(userData.user.created_at).format('MMMM Do YYYY')}
          </li>
          <br />
        </ul>
      ) : null}
      {userData && userData.admin ? (
        <>
          <a className='sidebar-link' href='https://www.opentable.com/'>
            Open Table
          </a>
          <a className='sidebar-link' href='https://resy.com/'>
            Resy
          </a>
        </>
      ) : null}
    </div>
  );
};

export default Sidebar;
