import React, { useState, useEffect } from 'react';
import { fetchItineraryPackages } from './api-admin';
import { Link } from 'react-router-dom';

const AdminItineraryPackages = props => {
  const { userData } = props;
  const [allPackages, setAllPackages] = useState([]);

  useEffect(() => {
    if (userData) {
      fetchItineraryPackages(userData).then(json => setAllPackages(json));
    }
  }, [userData]);

  return (
    <div className='container'>
      <h1>Itinerary packages</h1>
      <Link to='/admin/itinerary_packages/new'>New</Link>
      {allPackages.map(pkg => (
        <Link key={pkg.id} to={`/admin/itinerary_packages/${pkg.id}`}>
          {JSON.stringify(pkg)}
        </Link>
      ))}
    </div>
  );
};

export default AdminItineraryPackages;
