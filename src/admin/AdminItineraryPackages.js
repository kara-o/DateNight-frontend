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
      <h1>Itinerary Packages</h1>
      <Link to='/admin/itinerary_packages/new'>Make a New Package</Link>
      {allPackages.map(pkg => (
        <Link key={pkg.id} to={`/admin/itinerary_packages/${pkg.id}`}>
          {pkg.title}
        </Link>
      ))}
    </div>
  );
};

export default AdminItineraryPackages;
