import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const Sidebar = ({ userData }) => {
  console.log(userData);
  const renderInitials = () => {
    if (userData.user.first_name) {
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
      {userData ? <ul id='sidebar-list'></ul> : null}
    </div>
  );
};

export default Sidebar;
