import React, { useEffect, useState } from 'react';
import Button from '../layout/Button';
import { fetchRequest } from '../user/services/api';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import ItineraryItem from './ItineraryItem';

const AdminRequestShow = props => {
  const { userData } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    if (userData) {
      fetchRequest(userData, requestId).then(res => {
        console.log(res);
        setRequest(res.request);
      });
    }
  }, [userData]);

  const renderContacts = () => {
    return request.contacts.map((c, i) => {
      return (
        <li key={c.id} className='contact'>
          Contact #{i + 1}: {c.phone}
        </li>
      );
    });
  };

  return request ? (
    <div className='admin-show'>
      <p>Date: {moment(request.start_time).format('MMMM Do YYYY')}</p>
      <p>Time: {moment(request.start_time).format('h:mm a')}</p>
      <p>Party: {request.party_size} people</p>
      <ul>{renderContacts()}</ul>
      <p>Neighborhood: {request.neighborhood}</p>
      <p>Price Range: {request.price_range}</p>
    </div>
  ) : null;
};

export default AdminRequestShow;
