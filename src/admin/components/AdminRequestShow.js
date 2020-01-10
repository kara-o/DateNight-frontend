import React, { useEffect, useState } from 'react';
import Button from '../../layout/Button';
import { fetchRequest } from '../../user/services/api';
import * as moment from 'moment';
import {
  toggleRequestFulfilled,
  fetchItineraryPackages,
  applyItineraryPackage,
  sendTextMessages
} from '../services/api-admin';
import { Link } from 'react-router-dom';
import ItineraryItem from './ItineraryItem';
import { Paper } from '@material-ui/core';

const AdminRequestShow = props => {
  const { userData } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);
  const [itinPackages, setItinPackages] = useState(null);

  useEffect(() => {
    if (userData) {
      fetchRequest(userData, requestId).then(res => {
        setRequest(res.request);
      });
      fetchItineraryPackages(userData).then(setItinPackages);
    }
  }, [userData]);

  const handleComplete = () => {
    toggleRequestFulfilled(
      userData,
      requestId,
      !request.fulfilled
    ).then(respJson => setRequest(respJson.request));
  };

  const renderContacts = () => {
    return request.contacts.map((c, i) => {
      return (
        <li key={c.id} className='contact'>
          Contact #{i + 1}: {c.phone}
        </li>
      );
    });
  };

  const handleApplyPackage = itinPackageId => {
    applyItineraryPackage(requestId, itinPackageId, userData).then(respJson =>
      setRequest(respJson.request)
    );
  };

  if (request === null || itinPackages === null) {
    return (
      <div className='admin-show'>
        <p>Loading...</p>
      </div>
    );
  }

  const handleMessage = () => {
    sendTextMessages(userData, requestId);
  };

  return request ? (
    <div className='admin-show'>
      <div className='show'>
        <h2>Request</h2>
        <Paper elevation={10} className='paper show'>
          <p>Date: {moment(request.start_time).format('MMMM Do YYYY')}</p>
          <p>Time: {moment(request.start_time).format('h:mm a')}</p>
          <p>Party: {request.party_size} people</p>
          <ul>{renderContacts()}</ul>
          <p>Neighborhood: {request.neighborhood}</p>
          <p>Price Range: {request.price_range}</p>
          <p>Notes: {request.notes}</p>
          <p>
            Fulfilled: {(!!request.fulfilled).toString()}{' '}
            {request.cancelled ? (
              <span>
                <strong style={{ color: 'red' }}>CANCELLED</strong>
              </span>
            ) : null}
          </p>
          <Button type='button' onClick={handleComplete}>
            {request.fulfilled ? 'Mark as incomplete' : 'Mark as complete'}
          </Button>
          {request.fulfilled ? (
            <Button type='button' onClick={handleMessage}>
              Alert (DEMO ONLY)
            </Button>
          ) : null}
        </Paper>
      </div>
      <div className='itinerary'>
        <h2>Itinerary</h2>
        {!request.itinerary_items.length
          ? 'Empty'
          : request.itinerary_items.map(item => (
              <ItineraryItem key={item.id} item={item} admin={true} />
            ))}
      </div>
      <div className='packages'>
        <h2>Packages</h2>
        <ul className='pkg-list-show'>
          {itinPackages.map(pkg => (
            <li className='pkg-link' key={pkg.id}>
              <Link to={`/admin/itinerary_packages/${pkg.id}`}>
                {pkg.price_range.split(' ')[0]} - {pkg.neighborhood} -{' '}
                {pkg.title}
              </Link>
              <Button type='button' onClick={() => handleApplyPackage(pkg.id)}>
                Apply
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
};

export default AdminRequestShow;
