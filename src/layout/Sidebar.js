import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import Button from './Button';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
  admin: state.admin
});

const Sidebar = ({ admin, user }) => {
  console.log(admin);
  const renderInitials = () => {
    if (!admin) {
      return (
        <span className='icon-span'>
          {`${user.first_name.slice(0, 1)}` + `${user.last_name.slice(0, 1)}`}
        </span>
      );
    } else {
      return 'ADMIN';
    }
  };

  return (
    <div className='sidebar'>
      <Link className='avatar link' to={user && admin ? '/admin' : '/'}>
        <Avatar className='avatar'>{renderInitials()}</Avatar>
      </Link>
      {user && !admin ? (
        <ul className='sidebar-list'>
          <Link className='sidebar-link' to={`/requests/new`}>
            <Button>Make a New Request!</Button>
          </Link>
          <Link className='sidebar-link' to={`/`}>
            <Button>Back</Button>
          </Link>
        </ul>
      ) : null}
      {user && admin ? (
        <ul className='sidebar-list'>
          <Link className='sidebar-link' to='/admin/'>
            <Button>Requests</Button>
          </Link>
          <Link className='sidebar-link' to='/admin/itinerary_packages'>
            <Button>Itinerary Packages</Button>
          </Link>
          {/* <Link className='sidebar-link' to='/admin/itinerary_items'>
            <Button>Single Itinerary Items</Button>
          </Link> */}
        </ul>
      ) : null}
    </div>
  );
};

export default connect(mapStateToProps)(Sidebar);
