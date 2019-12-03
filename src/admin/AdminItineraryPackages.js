import React, { useState, useEffect } from 'react';
import { fetchItineraryPackages } from './api-admin';

const AdminItineraryPackages = props => {
  const { userData } = props;
  const [allPackages, setAllPackages] = useState([]);

  useEffect(() => {
    if (userData) {
      fetchItineraryPackages(userData).then(json => setAllPackages(json));
    }
  }, [userData]);

  return (
    <>
      {allPackages.map(pkg => (
        <p key={pkg.id}>{JSON.stringify(pkg)}</p>
      ))}
    </>
  );
};

export default AdminItineraryPackages;
