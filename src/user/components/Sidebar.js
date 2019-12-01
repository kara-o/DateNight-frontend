import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const Sidebar = ({ currentUser }) => {
  const renderInitials = () => {
    if (currentUser) {
      return (
        `${currentUser.user.first_name.slice(0, 1)}` +
        `${currentUser.user.last_name.slice(0, 1)}`
      );
    }
  };

  return (
    <div className='sidebar'>
      <Avatar id='avatar'>{renderInitials()}</Avatar>
      {currentUser ? (
        <ul id='sidebar-list'>
          {!currentUser.admin ? (
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
