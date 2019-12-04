import React, { useState, useEffect } from 'react';
import { fetchItineraryPackages } from './api-admin';
import { Link } from 'react-router-dom';
import { Select, MenuItem, InputLabel } from '@material-ui/core/';

const AdminItineraryPackages = props => {
  const { userData } = props;
  const [allPackages, setAllPackages] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (userData) {
      fetchItineraryPackages(userData).then(json => setAllPackages(json));
    }
  }, [userData]);

  const renderPackages = () => {
    let pkgs;
    if (filter) {
      pkgs = allPackages.filter(pkg => pkg.neighborhood === filter);
    } else {
      pkgs = allPackages;
    }
    return pkgs.map(pkg => {
      return (
        <li key={pkg.id} className='pkg-row'>
          <Link to={`/admin/itinerary_packages/${pkg.id}`}>
            <ul className='pkg-row-list'>
              <li>{pkg.title}</li>
              <li>{pkg.neighborhood}</li>
            </ul>
          </Link>
        </li>
      );
    });
  };

  const renderMenuItems = () => {
    if (allPackages) {
      const neighborhoods = allPackages.map(p => p.neighborhood);
      const uniques = neighborhoods.filter((v, i, a) => a.indexOf(v) === i);
      return uniques.map(n => {
        return <MenuItem value={n}>{n}</MenuItem>;
      });
    }
  };

  const renderFilter = () => {
    return (
      <div className='filter'>
        <InputLabel id='select-label'>Filter By Neighborhood</InputLabel>
        <Select labelId='select-label' value={filter} onChange={handleChange}>
          {renderMenuItems()}
        </Select>
      </div>
    );
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  return (
    <>
      {allPackages.length > 0 ? (
        <>
          <Link to='/admin/itinerary_packages/new'>Make a New Package</Link>
          <div className='list-div'>
            <h1>Itinerary Packages</h1>
            {renderFilter()}
            <ul className='pkg-list'>{renderPackages()}</ul>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AdminItineraryPackages;
