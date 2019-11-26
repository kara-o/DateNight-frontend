import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const Sidebar = ({ currentUserData }) => {
  const currentUser = currentUserData.user;

  const renderInitials = () => {
    return currentUser
      ? `${currentUser.first_name.slice(0, 1)}` +
          `${currentUser.last_name.slice(0, 1)}`
      : null;
  };

  return (
    <div className='sidebar'>
      <Avatar id='avatar'>{renderInitials()}</Avatar>
      {currentUser ? (
        <ul id='sidebar-list'>
          <li>
            <strong>{currentUser.username}</strong>
          </li>
          <li>Member Since: {currentUser.join_date}</li>
        </ul>
      ) : null}
    </div>
  );
};

export default Sidebar;
