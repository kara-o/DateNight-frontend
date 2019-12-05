import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import Button from '../../layout/Button';

const Sidebar = ({ userData }) => {
  const renderInitials = () => {
    if (!userData.admin) {
      return (
        <span className='icon-span'>
          {`${userData.user.first_name.slice(0, 1)}` +
            `${userData.user.last_name.slice(0, 1)}`}
        </span>
      );
    } else {
      return 'ADMIN';
    }
  };

  return (
    <div className='sidebar'>
      <Link
        className='avatar link'
        to={userData && userData.admin ? '/admin' : '/'}
      >
        <Avatar className='avatar'>{renderInitials()}</Avatar>
      </Link>
      {userData && !userData.admin ? (
        <ul className='sidebar-list'>
          <Link className='sidebar-link' to={`/requests/new`}>
            <Button>Make a New Request!</Button>
          </Link>
          <Link className='sidebar-link' to={`/`}>
            <Button>Back</Button>
          </Link>
        </ul>
      ) : null}
      {userData && userData.admin ? (
        <ul className='sidebar-list'>
          <Link className='sidebar-link' to='/admin/'>
            <Button>Requests</Button>
          </Link>
          <Link className='sidebar-link' to='/admin/itinerary_packages'>
            <Button>Itinerary Packages</Button>
          </Link>
        </ul>
      ) : null}
    </div>
  );
};

export default Sidebar;
