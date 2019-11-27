import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const Sidebar = ({ currentUser, admin }) => {
  const renderInitials = () => {
    return currentUser
      ? `${currentUser.first_name.slice(0, 1)}` +
          `${currentUser.last_name.slice(0, 1)}`
      : null;
  };

  return (
    <div className='sidebar'>
      <Avatar id='avatar'>{admin ? 'ADMIN' : renderInitials()}</Avatar>
      {currentUser ? (
        <ul id='sidebar-list'>
          {!admin ? (
            <>
              <li>
                <strong>{currentUser.username}</strong>
              </li>
              <li>Member Since: {currentUser.join_date}</li>
            </>
          ) : (
            <>
              <li>
                <h3>ADMIN OPTIONS</h3>
              </li>
              <li>
                <a href='https://www.opentable.com/'>Open Table</a>
              </li>
            </>
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default Sidebar;
